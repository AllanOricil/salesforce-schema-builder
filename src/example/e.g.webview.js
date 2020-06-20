const {
    WebView
} = require('../vscode/vscode.webview');
const vscode = require("vscode");
const {
    execSync
} = require("child_process");

const path = require("path");
const fs = require("fs-extra");
const {
    GLOBAL_STORAGE_DIR,
    getDefaultOrg,
    getSObjectsNamesGivenUsername
} = require('../lib/utils.js');
/**
 *Add business
 *
 * @class EGWebView
 * @extends {WebView}
 */
class EGWebView extends WebView {
    /**
     * Creates an instance of EGWebView.
     * @memberof EGWebView
     */
    constructor() {
        super();
        this.handler.addApi({
            getAvailableGlobalValueSets: () => {
                try {
                    const globalValueSetResult = execSync(
                        `sfdx force:mdapi:listmetadata -m GlobalValueSet --json`, {
                            cwd: vscode.workspace.rootPath,
                        }
                    );
                    const globalValueSetResultObject = JSON.parse(
                        globalValueSetResult.toString()
                    );
                    this.panel.webview.postMessage({
                        cmd: "globalValueSets",
                        data: globalValueSetResultObject,
                    });
                } catch (e) {
                    vscode.window
                        .showErrorMessage("Couldn't get GlobalValueSets", "Show Output")
                        .then((selection) => {
                            if (selection === "Show Output") {
                                this.channel.show();
                            }
                        });
                    this.panel.webview.postMessage({
                        cmd: "globalValueSets",
                        result: "error",
                    });
                    this.channel.appendLine(e);
                }
            },
            getAllObjectNames: () => {
                try {
                    const defaultOrg = getDefaultOrg();
                    let sObjectsFile = undefined;

                    const sObjectsFilePath = path.resolve(path.join(GLOBAL_STORAGE_DIR, defaultOrg.username, 'sObjects.json'));
                    //check if the files is already retrieved for the default org
                    try {
                        sObjectsFile = fs.readFileSync(sObjectsFilePath, {
                            encoding: 'utf-8'
                        });
                    } catch (e) {}

                    //if there is no file or the file is emtpy call sfdx and save the result in the default org directory
                    let sObjects = sObjectsFile ? JSON.parse(sObjectsFile) : undefined;
                    if (!(sObjects && sObjects.result && sObjects.result.length)) {
                        getSObjectsNamesGivenUsername(defaultOrg.username);
                        sObjectsFile = fs.readFileSync(sObjectsFilePath, {
                            encoding: 'utf-8'
                        });
                        sObjects = JSON.parse(sObjectsFile);
                    }

                    this.panel.webview.postMessage({
                        cmd: "objects",
                        data: sObjects,
                    });
                } catch (e) {
                    vscode.window
                        .showErrorMessage("Couldn't get the Objects", "Show Output")
                        .then((selection) => {
                            if (selection === "Show Output") {
                                this.channel.show();
                            }
                        });
                    this.panel.webview.postMessage({
                        cmd: "objects",
                        result: "error",
                    });
                    this.channel.appendLine(e);
                }
            },
            createCustomObject: (data) => {
                const customObjectXml = data.xml;
                const customObjectName = data.objectName;
                const customObjectsFolder = path.join(vscode.workspace.rootPath, ".schema", "defaultusername", "customObjects");

                const customObjectFolder = path.join(
                    customObjectsFolder,
                    customObjectName + "__c"
                );
                fs.mkdirpSync(customObjectFolder);
                fs.mkdirpSync(path.join(
                    customObjectFolder,
                    "objects"
                ));

                fs.writeFileSync(path.join(customObjectFolder, "package.xml"), `<?xml version="1.0" encoding="UTF-8"?>
  <Package xmlns="http://soap.sforce.com/2006/04/metadata">
      <types>
          <members>*</members>
          <name>CustomObject</name>
      </types>
      <version>48.0</version>
  </Package>
  `, {
                    encoding: 'utf8'
                });

                fs.writeFileSync(
                    path.join(
                        customObjectFolder,
                        "objects",
                        customObjectName + "__c.object"
                    ),
                    customObjectXml, {
                        encoding: "utf8",
                    }
                );

                try {
                    const metadataDeployResult = execSync(
                        `sfdx force:mdapi:deploy -d ${customObjectFolder} -w 90 --json`, {
                            cwd: vscode.workspace.rootPath,
                            encoding: "utf8"
                        }
                    );

                    this.channel.appendLine(metadataDeployResult.toString());
                    vscode.window.showInformationMessage("Custom Object Created", "Show Output").then((selection) => {
                        if (selection === "Show Output") {
                            this.channel.show();
                        }
                    });
                    this.panel.webview.postMessage({
                        cmd: "customObjectCreated"
                    });
                } catch (e) {
                    this.channel.appendLine(e.stdout);
                    vscode.window
                        .showErrorMessage("Deploy Failed", "Show Output")
                        .then((selection) => {
                            if (selection === "Show Output") {
                                this.channel.show();
                            }
                        });
                    this.panel.webview.postMessage({
                        cmd: "customObjectCreated"
                    });
                }
            }
        });
    }

    /**
     * Activate
     * @param {import('vscode').ExtensionContext} context vscode extension context
     * @param {string} name webview name
     * @param {string} cmdName cmd name
     * @param {string} [htmlPath=path.join(context.extensionPath, 'web', 'dist', 'index.html')] html path
     * @returns {this}
     * @memberof WebView
     */
    activate(context, name, cmdName, htmlPath = undefined) {
        // custom code if need
        return super.activate(context, name, cmdName, htmlPath);
    }
}

module.exports = EGWebView;