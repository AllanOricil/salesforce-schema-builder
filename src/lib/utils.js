// @ts-nocheck
const vscode = require("vscode");
const fs = require("fs-extra");
const path = require("path");
const {
  execSync,
  exec
} = require("child_process");
const axios = require("axios");
const HOME_DIR = require("os").homedir();
const GLOBAL_STORAGE_DIR = path.resolve(
  path.join(HOME_DIR, ".vscode", "extensions", ".schema")
);
const ORG_LIST_PATH = path.resolve(
  path.join(GLOBAL_STORAGE_DIR, "orgList.json")
);

const templateCustomObjectMetadata = (templatesPath, data) => {
  return new Promise((resolve) => {
    let template = fs.readFileSync(path.join(templatesPath, "SObject.xml"), {
      encoding: "utf-8",
    });

    template = templateCustomObjectNameField(
      template,
      data.dataType === "Text" ?
      "SObjectNameFieldText.xml" :
      "SObjectNameFieldAutoNumber.xml",
      templatesPath
    );

    for (let [key, value] of Object.entries(data)) {
      const regex = new RegExp(`{{${key}}}`, "gi");
      template = template.replace(regex, value);
    }

    resolve(template);
  });
};

const templateCustomObjectNameField = (template, type, templatesPath) => {
  const nameFieldRegex = new RegExp("{{nameField}}", "gi");
  const nameFieldTemplate = fs.readFileSync(path.join(templatesPath, type), {
    encoding: "utf-8",
  });
  template = template.replace(nameFieldRegex, nameFieldTemplate);
  return template;
};

const sfdxSpawn = (cmd, dir) => {
  const sfdxExecOptions = {
    cwd: dir,
  };
  console.log(cmd);
  cmd += " --json";
  console.log(cmd);
  return new Promise((resolve) => {
    resolve(execSync(cmd, sfdxExecOptions));
  });
};

const setupSchemaGlobalDirectory = () => {
  try {
    const stdout = JSON.parse(
      execSync("sfdx force:org:list --all --json", {
        encoding: "utf-8",
        cwd: vscode.workspace.rootPath,
      })
    );

    fs.writeFile(ORG_LIST_PATH, JSON.stringify(stdout), {
      encoding: "utf-8",
    });
    let orgs = undefined;
    if (
      stdout.result &&
      (stdout.result.nonScratchOrgs || stdout.result.scratchOrgs)
    ) {
      orgs = joinOrgLists(stdout);
      orgs.forEach((org) => {
        const orgDir = path.resolve(
          path.join(GLOBAL_STORAGE_DIR, org.username)
        );
        fs.ensureDir(orgDir);
        fs.ensureDir(path.resolve(path.join(orgDir, "customObjects")));
      });
    }
  } catch (error) {
    vscode.window.showErrorMessage(
      "Could not get Org List. Ensure you can run 'sfdx force:org:list --all --json' before opening the extension."
    );
    return;
  }
};

const getSObjectsNames = () => {
  try {
    const defaultOrg = getOrgDisplay();
    let sObjectsFile = undefined;

    const sObjectsFilePath = path.resolve(
      path.join(GLOBAL_STORAGE_DIR, defaultOrg.username, "sObjects.json")
    );
    //check if the files is already retrieved for the default org
    try {
      sObjectsFile = fs.readFileSync(sObjectsFilePath, {
        encoding: "utf-8",
      });
    } catch (e) {}

    //if there is no file or the file is emtpy call sfdx and save the result in the default org directory
    let sObjects = sObjectsFile ? JSON.parse(sObjectsFile) : undefined;
    if (!(sObjects && sObjects.result && sObjects.result.length)) {
      sObjects = refreshSObjects();
    }

    return sObjects;
  } catch (e) {
    throw e;
  }
};

const refreshSObjects = (panel) => {
  const defaultOrg = getOrgDisplay();
  return new Promise((resolve) => {
    getGlobalDescribe(defaultOrg).then(response => {
      const sObjectsFilePath = path.resolve(path.join(GLOBAL_STORAGE_DIR, defaultOrg.username, "sObjects.json"));
      fs.writeFile(sObjectsFilePath, response.data.sobjects, {
        encoding: 'utf-8'
      });

      if (panel)
        panel.webview.postMessage({
          cmd: "objects",
          data: response.data.sobjects,
        });
      resolve(response);
    });
  });
};

const getGlobalValueSets = () => {
  try {
    const defaultOrg = getOrgDisplay();
    let globalValuesetsFile = undefined;
    const globalValuesetsPath = path.resolve(
      path.join(GLOBAL_STORAGE_DIR, defaultOrg.username, "globalvalueset.json")
    );

    try {
      globalValuesetsFile = fs.readFileSync(globalValuesetsPath, {
        encoding: "utf-8",
      });
    } catch (e) {}

    //if there is no file or the file is emtpy call sfdx and save the result in the default org directory
    let globalValuesets = globalValuesetsFile ?
      JSON.parse(globalValuesetsFile) :
      undefined;
    if (
      !(
        globalValuesets &&
        globalValuesets.result &&
        globalValuesets.result.length
      )
    ) {
      globalValuesets = listMetadata('GlobalValueSet');
    }

    return globalValuesets;
  } catch (e) {
    throw e;
  }
};

const refreshGlobalValueSets = (panel) => {
  return listMetadata('GlobalValueSet', panel);
};

const listMetadata = (metadataName, panel) => {
  return new Promise((resolve, reject) => {
    const defaultOrg = getOrgDisplay();
    const metadataFileName = `${metadataName.toLowerCase()}.json`;
    const metadataFilePath = path.resolve(
      path.join(GLOBAL_STORAGE_DIR, defaultOrg.username, metadataFileName)
    );
    exec(
      `sfdx force:mdapi:listmetadata -m ${metadataName} --json`, {
        encoding: "utf-8",
        cwd: vscode.workspace.rootPath,
      }, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }

        fs.writeFile(metadataFilePath, stdout, {
          encoding: 'utf-8'
        });

        if (stdout) {
          if (panel)
            panel.webview.postMessage({
              cmd: "globalValueSets",
              data: JSON.parse(stdout),
            });
          resolve(JSON.parse(stdout));
        }

        if (stderr) {
          reject(JSON.parse(stderr));
        }
      }
    );
  });
};

const getOrgDisplay = () => {
  try {
    const stdout = JSON.parse(execSync(`sfdx force:org:display --json`, {
      encoding: "utf-8",
      cwd: vscode.workspace.rootPath,
    }));
    return stdout.result;
  } catch (e) {
    throw e;
  }
};

const getGlobalDescribe = (orgInfo) => {
  const orgDisplay = orgInfo || getOrgDisplay();
  return axios
    .get(`${orgDisplay.instanceUrl}/services/data/v48.0/sobjects/`, {
      headers: {
        Authorization: `Bearer ${orgDisplay.accessToken}`,
      },
    });
};

const callSObjectDescribe = (sObjectName, orgInfo) => {
  const orgDisplay = orgInfo || getOrgDisplay();
  return axios
    .get(`${orgDisplay.instanceUrl}/services/data/v48.0/sobjects/${sObjectName}/describe/`, {
      headers: {
        Authorization: `Bearer ${orgDisplay.accessToken}`,
      },
    });
};

const joinOrgLists = (orgResponse) => {
  return orgResponse.result.nonScratchOrgs && orgResponse.result.scratchOrgs ?
    orgResponse.result.nonScratchOrgs.concat(orgResponse.result.scratchOrgs) :
    orgResponse.result.nonScratchOrgs ?
    orgResponse.result.nonScratchOrgs :
    orgResponse.result.scratchOrgs;
};

module.exports = {
  templateCustomObjectMetadata,
  sfdxSpawn,
  setupSchemaGlobalDirectory,
  getSObjectsNames,
  refreshSObjects,
  getGlobalValueSets,
  refreshGlobalValueSets,
  getOrgDisplay,
  getGlobalDescribe,
  callSObjectDescribe,
  HOME_DIR,
  GLOBAL_STORAGE_DIR,
  ORG_LIST_PATH,
};