// @ts-nocheck
const vscode = require("vscode");
const fs = require("fs-extra");
const path = require("path");
const {
  execSync
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
    const defaultOrg = getDefaultOrg();
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
      sObjects = refreshSObjectsNames();
    }

    return sObjects;
  } catch (e) {
    throw e;
  }
};

const refreshSObjectsNames = () => {
  try {
    const defaultOrg = getDefaultOrg();
    let sObjectsFile = undefined;

    const sObjectsFilePath = path.resolve(
      path.join(GLOBAL_STORAGE_DIR, defaultOrg.username, "sObjects.json")
    );
    let sObjects = undefined;
    execSync(
      `sfdx force:schema:sobject:list -u ${
        defaultOrg.username
      } -c all --json > ${path.resolve(
        path.join(GLOBAL_STORAGE_DIR, defaultOrg.username, "sObjects.json")
      )}`, {
        encoding: "utf-8",
        cwd: vscode.workspace.rootPath,
      }
    );
    sObjectsFile = fs.readFileSync(sObjectsFilePath, {
      encoding: "utf-8",
    });
    sObjects = JSON.parse(sObjectsFile);

    return sObjects;
  } catch (e) {
    throw e;
  }
};

const getGlobalValueSets = () => {
  try {
    const defaultOrg = getDefaultOrg();
    let globalValuesetsFile = undefined;
    const globalValuesetsPath = path.resolve(
      path.join(GLOBAL_STORAGE_DIR, defaultOrg.username, "globalValueSets.json")
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
      globalValuesets = refreshGlobalValueSets();
    }

    return globalValuesets;
  } catch (e) {
    throw e;
  }
};

const refreshGlobalValueSets = () => {
  try {
    const defaultOrg = getDefaultOrg();
    let globalValuesetsFile = undefined;
    const globalValuesetsPath = path.resolve(
      path.join(GLOBAL_STORAGE_DIR, defaultOrg.username, "globalValueSets.json")
    );
    let globalValuesets = undefined;
    execSync(
      `sfdx force:mdapi:listmetadata -m GlobalValueSet -u ${
        defaultOrg.username
      } --json > ${path.resolve(
        path.join(
          GLOBAL_STORAGE_DIR,
          defaultOrg.username,
          "globalValueSets.json"
        )
      )}`, {
        encoding: "utf-8",
        cwd: vscode.workspace.rootPath,
      }
    );
    globalValuesetsFile = fs.readFileSync(globalValuesetsPath, {
      encoding: "utf-8",
    });
    globalValuesets = JSON.parse(globalValuesetsFile);

    return globalValuesets;
  } catch (e) {
    throw e;
  }
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

const getGlobalDescribe = () => {
  const orgDisplay = getOrgDisplay();
  return axios
    .get(`${orgDisplay.instanceUrl}/services/data/v48.0/sobjects/`, {
      headers: {
        Authorization: `Bearer ${orgDisplay.accessToken}`,
      },
    });
};

const callSObjectDescribe = (sObjectName) => {
  const orgDisplay = getOrgDisplay();
  return axios
    .get(`${orgDisplay.instanceUrl}/services/data/v48.0/sobjects/${sObjectName}/describe/`, {
      headers: {
        Authorization: `Bearer ${orgDisplay.accessToken}`,
      },
    });
};

const getDefaultOrg = () => {
  const orgFile = JSON.parse(
    fs.readFileSync(ORG_LIST_PATH, {
      encoding: "utf-8",
    })
  );
  const orgs = joinOrgLists(orgFile);
  return orgs.find((org) => org.isDefaultUsername);
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
  refreshSObjectsNames,
  getGlobalValueSets,
  refreshGlobalValueSets,
  getDefaultOrg,
  getOrgDisplay,
  getGlobalDescribe,
  callSObjectDescribe,
  HOME_DIR,
  GLOBAL_STORAGE_DIR,
  ORG_LIST_PATH,
};