const vscode = require("vscode");
const utils = require("../vscode/vscode.utils");
const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;
const exec = require('child_process').exec;
const EGWebView = require("./e.g.webview");

const name = "Schema Builder";
const webview = new EGWebView();

/**
 * @param {vscode.ExtensionContext} context
 */
const activate = (context) => {
  // example.webview
  webview.activate(context, name, "SFDX.schemaBuilder");

  const schemaFolder = path.join(vscode.workspace.rootPath, '.schema');

  fs.ensureDir(path.join(vscode.workspace.rootPath, '.schema'));

  const sfdxOrgsResult = JSON.parse(execSync('sfdx force:org:list --all --json', {
    encoding: 'utf-8',
    cwd: vscode.workspace.rootPath
  })).result;

  const sfdxConfigList = execSync('sfdx force:config:list --json', {
    encoding: 'utf-8',
    cwd: vscode.workspace.rootPath
  });

  fs.writeFile(path.join(schemaFolder, 'sfdxConfig.json'), sfdxConfigList, {
    encoding: 'utf-8'
  });

  let orgs = undefined;
  if (sfdxOrgsResult)
    orgs = sfdxOrgsResult.nonScratchOrgs.concat(sfdxOrgsResult.scratchOrgs);

  orgs.forEach(org => {
    const scratchOrgFolder = path.join(vscode.workspace.rootPath, '.schema', org.username);
    fs.ensureDirSync(scratchOrgFolder);

    fs.writeFileSync(path.join(scratchOrgFolder, 'orgDetails.json'), JSON.stringify(org), {
      encoding: 'utf-8'
    });

    try {
      exec(
        `sfdx force:schema:sobject:list -u ${org.username} -c custom --json > ${path.join(scratchOrgFolder, 'customObjects.json')}`, {
          encoding: 'utf-8',
          cwd: vscode.workspace.rootPath,
        }
      );
    } catch (e) {
      fs.writeFileSync(path.join(scratchOrgFolder, 'error.json'), JSON.stringify(e), {
        encoding: 'utf-8'
      });
    }
    try {
      exec(
        `sfdx force:schema:sobject:list -u ${org.username} -c standard --json > ${path.join(scratchOrgFolder, 'standardObjects.json')}`, {
          encoding: 'utf-8',
          cwd: vscode.workspace.rootPath,
        }
      );
    } catch (e) {
      fs.writeFileSync(path.join(scratchOrgFolder, 'error.json'), JSON.stringify(e), {
        encoding: 'utf-8'
      });
    }

    // example.helloWorld
    /*context.subscriptions.push(
          vscode.commands.registerCommand('example.helloWorld', function() {
              utils.Api.showMessage({ txt: 'Hello World!' });
          })
      );*/
  });
};

const deactivate = () => {
  webview.deactivate();
};

module.exports = {
  name,
  activate,
  deactivate,
};