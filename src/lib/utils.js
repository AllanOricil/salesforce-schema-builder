// @ts-nocheck
const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');
const { execSync, exec } = require('child_process');
const axios = require('axios');
const HOME_DIR = require('os').homedir();
const GLOBAL_STORAGE_DIR = path.resolve(path.join(HOME_DIR, '.schemabuilder'));
const ORG_LIST_PATH = path.resolve(
  path.join(GLOBAL_STORAGE_DIR, 'orgList.json')
);
const TIME_TO_REQUEST_NEW_AUTH_TOKEN = 1;

const setupSchemaGlobalDirectory = () => {
  try {
    const stdout = JSON.parse(
      execSync('sfdx force:org:list --all --json', {
        encoding: 'utf-8',
        cwd: vscode.workspace.rootPath,
      })
    );

    fs.writeFile(ORG_LIST_PATH, JSON.stringify(stdout), {
      encoding: 'utf-8',
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
        fs.ensureDir(path.resolve(path.join(orgDir, 'customObjects')));
      });
    }
  } catch (e) {
    throw e;
  }
};

const getSObjectsNames = (defaultOrg) => {
  try {
    let sObjectsFile = undefined;

    const sObjectsFilePath = path.resolve(
      path.join(GLOBAL_STORAGE_DIR, defaultOrg.username, 'sobjects.json')
    );
    //check if the files is already retrieved for the default org
    try {
      sObjectsFile = fs.readFileSync(sObjectsFilePath, {
        encoding: 'utf-8',
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

const refreshSObjects = (defaultOrg, callback) => {
  return new Promise((resolve) => {
    getGlobalDescribe(defaultOrg).then((response) => {
      const sObjectsFilePath = path.resolve(
        path.join(GLOBAL_STORAGE_DIR, defaultOrg.username, 'sobjects.json')
      );
      fs.writeFile(sObjectsFilePath, JSON.stringify(response.data.sobjects), {
        encoding: 'utf-8',
      });

      if (callback) callback(response);
      resolve(response);
    });
  });
};

const getGlobalValueSets = (defaultOrg) => {
  try {
    let globalValuesetsFile = undefined;
    const globalValuesetsPath = path.resolve(
      path.join(GLOBAL_STORAGE_DIR, defaultOrg.username, 'globalvalueset.json')
    );

    try {
      globalValuesetsFile = fs.readFileSync(globalValuesetsPath, {
        encoding: 'utf-8',
      });
    } catch (e) {}

    //if there is no file or the file is emtpy call sfdx and save the result in the default org directory
    let globalValuesets = globalValuesetsFile
      ? JSON.parse(globalValuesetsFile)
      : undefined;
    if (
      !(
        globalValuesets &&
        globalValuesets.result &&
        globalValuesets.result.length
      )
    ) {
      return listMetadata('GlobalValueSet', defaultOrg);
    }

    return new Promise((resolve) => resolve(globalValuesets));
  } catch (e) {
    throw e;
  }
};

const refreshGlobalValueSets = (defaultOrg, callback) => {
  return listMetadata('GlobalValueSet', defaultOrg, callback);
};

const getLabels = (defaultOrg) => {
  try {
    let labelsFile = undefined;
    const labelsFilePath = path.resolve(
      path.join(GLOBAL_STORAGE_DIR, defaultOrg.username, 'customlabels.json')
    );

    try {
      labelsFile = fs.readFileSync(labelsFilePath, {
        encoding: 'utf-8',
      });
    } catch (e) {}

    //if there is no file or the file is emtpy call sfdx and save the result in the default org directory
    let labels = labelsFile ? JSON.parse(labelsFile) : undefined;
    if (!(labels && labels.result && labels.result.length)) {
      return listMetadata('CustomLabel', defaultOrg);
    }

    return labels;
  } catch (e) {
    throw e;
  }
};

const refreshLabels = (defaultOrg, callback) => {
  return listMetadata('CustomLabel', defaultOrg, callback);
};

const listMetadata = (metadataName, defaultOrg, callback) => {
  return new Promise((resolve, reject) => {
    const metadataFileName = `${metadataName.toLowerCase()}.json`;
    const metadataFilePath = path.resolve(
      path.join(GLOBAL_STORAGE_DIR, defaultOrg.username, metadataFileName)
    );
    exec(
      `sfdx force:mdapi:listmetadata -m ${metadataName} --json`,
      {
        encoding: 'utf-8',
        cwd: vscode.workspace.rootPath,
      },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }

        fs.writeFile(metadataFilePath, stdout, {
          encoding: 'utf-8',
        });

        if (stdout) {
          const response = JSON.parse(stdout);
          if (callback) callback(response);
          resolve(response);
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
    const configList = JSON.parse(
      execSync(`sfdx force:config:list --json`, {
        encoding: 'utf-8',
        cwd: vscode.workspace.rootPath,
      })
    );

    let defaultUsername = undefined;
    if (configList.result && configList.result.length) {
      defaultUsername = configList.result.filter(
        (config) => config.key === 'defaultusername'
      );
    } else {
      throw e;
    }

    if (!defaultUsername) throw e;

    const orgDisplayFilePath = path.resolve(
      path.join(GLOBAL_STORAGE_DIR, 'orgdisplay.json')
    );
    fs.ensureFileSync(orgDisplayFilePath);
    let orgDisplay = undefined;
    try {
      orgDisplay = JSON.parse(
        fs.readFileSync(orgDisplayFilePath, {
          encoding: 'utf-8',
        })
      );
    } catch (e) {}

    if (orgDisplay && orgDisplay.updatedTime) {
      const elapsedTimeInHours =
        Math.abs(new Date(orgDisplay.updatedTime) - new Date()) /
        (1000 * 60 * 60);
      if (
        elapsedTimeInHours > TIME_TO_REQUEST_NEW_AUTH_TOKEN ||
        orgDisplay.result.username !== defaultUsername[0].value
      ) {
        return refreshOrgDisplay();
      } else {
        return orgDisplay.result;
      }
    } else {
      return refreshOrgDisplay();
    }
  } catch (e) {
    throw e;
  }
};

const refreshOrgDisplay = () => {
  const stdout = JSON.parse(
    execSync(`sfdx force:org:display --json`, {
      encoding: 'utf-8',
      cwd: vscode.workspace.rootPath,
    })
  );

  stdout.updatedTime = new Date();

  fs.writeFile(
    path.resolve(path.join(GLOBAL_STORAGE_DIR, 'orgdisplay.json')),
    JSON.stringify(stdout),
    {
      encoding: 'utf-8',
    }
  );

  return stdout.result;
};

const getGlobalDescribe = (defaultOrg) => {
  return axios.get(`${defaultOrg.instanceUrl}/services/data/v48.0/sobjects/`, {
    headers: {
      Authorization: `Bearer ${defaultOrg.accessToken}`,
    },
  });
};

const getOrgInfo = () => {
  const stdout = JSON.parse(
    execSync(
      `sfdx force:data:soql:query -q "SELECT LanguageLocaleKey FROM Organization" --json`,
      {
        encoding: 'utf-8',
        cwd: vscode.workspace.rootPath,
      }
    )
  );

  return stdout.result.records[0];
};

const refreshOrgInfo = (defaultOrg, callback) => {
  return new Promise((resolve) => {
    const orgInfo = getOrgInfo();
    if (callback) callback(orgInfo);
    resolve(orgInfo);
  });
};

const executeSOQL = (soql, defaultOrg) => {
  return axios.get(
    `${defaultOrg.instanceUrl}/services/data/v48.0/query/?q=${soql.replace(
      /\s/g,
      '+'
    )}`,
    {
      headers: {
        Authorization: `Bearer ${defaultOrg.accessToken}`,
      },
    }
  );
};

const callSObjectDescribe = (defaultOrg, sObjectName) => {
  return axios.get(
    `${defaultOrg.instanceUrl}/services/data/v48.0/sobjects/${sObjectName}/describe/`,
    {
      headers: {
        Authorization: `Bearer ${defaultOrg.accessToken}`,
      },
    }
  );
};

const joinOrgLists = (orgResponse) => {
  return orgResponse.result.nonScratchOrgs && orgResponse.result.scratchOrgs
    ? orgResponse.result.nonScratchOrgs.concat(orgResponse.result.scratchOrgs)
    : orgResponse.result.nonScratchOrgs
    ? orgResponse.result.nonScratchOrgs
    : orgResponse.result.scratchOrgs;
};

module.exports = {
  setupSchemaGlobalDirectory,
  getSObjectsNames,
  refreshSObjects,
  getGlobalValueSets,
  refreshGlobalValueSets,
  getOrgDisplay,
  getGlobalDescribe,
  callSObjectDescribe,
  getOrgInfo,
  refreshOrgInfo,
  getLabels,
  refreshLabels,
  HOME_DIR,
  GLOBAL_STORAGE_DIR,
  ORG_LIST_PATH,
};
