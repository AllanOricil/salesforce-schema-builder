// @ts-nocheck
const {
    WebView
} = require("../vscode/vscode.webview");
const vscode = require("vscode");
const {
    execSync
} = require("child_process");

const path = require("path");
const fs = require("fs-extra");
const {
    getGlobalValueSets,
    refreshGlobalValueSets,
    refreshSObjects,
    getOrgDisplay,
    getGlobalDescribe,
    callSObjectDescribe,
    GLOBAL_STORAGE_DIR
} = require("../lib/utils.js");
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

        this.onDidPose = () => {
            this.defaultOrg = getOrgDisplay();
        };

        this.handler.addApi({
            getAvailableGlobalValueSets: () => {
                try {
                    const globalValuesets = getGlobalValueSets(this.defaultOrg);
                    this.panel.webview.postMessage({
                        cmd: "globalValueSets",
                        data: globalValuesets,
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
                        data: e,
                    });
                    this.channel.appendLine(e);
                }
            },
            getAllObjectNames: () => {
                try {
                    getGlobalDescribe(this.defaultOrg).then(response => {
                        this.panel.webview.postMessage({
                            cmd: "objects",
                            data: response.data.sobjects,
                        });
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
                        data: e,
                    });
                    this.channel.appendLine(e);
                }
            },
            createCustomObject: (data) => {
                const customObjectXml = data.xml;
                const customObjectName = data.objectName;
                const customObjectsFolder = path.join(
                    GLOBAL_STORAGE_DIR,
                    this.defaultOrg.username,
                    "customObjects"
                );

                const customObjectFolder = path.join(
                    customObjectsFolder,
                    customObjectName + "__c"
                );
                fs.mkdirpSync(customObjectFolder);
                fs.mkdirpSync(path.join(customObjectFolder, "objects"));

                fs.writeFileSync(
                    path.join(customObjectFolder, "package.xml"),
                    `<?xml version="1.0" encoding="UTF-8"?>
  <Package xmlns="http://soap.sforce.com/2006/04/metadata">
      <types>
          <members>*</members>
          <name>CustomObject</name>
      </types>
      <version>48.0</version>
  </Package>
  `, {
                        encoding: "utf8",
                    }
                );

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
                            encoding: "utf8",
                        }
                    );

                    this.channel.appendLine(metadataDeployResult.toString());
                    vscode.window
                        .showInformationMessage("Custom Object Created", "Show Output")
                        .then((selection) => {
                            if (selection === "Show Output") {
                                this.channel.show();
                            }
                        });
                    this.panel.webview.postMessage({
                        cmd: "customObjectCreated",
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
                        cmd: "customObjectCreated",
                        data: e
                    });
                }
            },
            refreshGlobalValueSetsAndObjectsMetadata: () => {
                this.defaultOrg = getOrgDisplay();
                Promise.all([
                    refreshGlobalValueSets(this.defaultOrg, this.panel),
                    refreshSObjects(this.defaultOrg, this.panel)
                ]).then(() => {
                    this.panel.webview.postMessage({
                        cmd: "refreshedMetadata",
                    });
                }).catch(e => {
                    vscode.window
                        .showErrorMessage("Couldn't Refresh Metadata", "Show Output")
                        .then((selection) => {
                            if (selection === "Show Output") {
                                this.channel.show();
                            }
                        });
                    this.panel.webview.postMessage({
                        cmd: "refreshedMetadata",
                        data: e,
                    });
                    this.channel.appendLine(e);
                });
            },
            getSObjectDescribe: (sObject) => {
                callSObjectDescribe(this.defaultOrg, sObject).then((response) => {
                    this.panel.webview.postMessage({
                        cmd: 'receiveSObjectDescription',
                        data: response.data,
                    });
                });
            },
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