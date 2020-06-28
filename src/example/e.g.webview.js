// @ts-nocheck
const {
  WebView
} = require('../vscode/vscode.webview');
const vscode = require('vscode');
const {
  execSync
} = require('child_process');

const path = require('path');
const fs = require('fs-extra');
const {
  getGlobalValueSets,
  refreshGlobalValueSets,
  refreshSObjects,
  getOrgDisplay,
  getGlobalDescribe,
  callSObjectDescribe,
  getOrgInfo,
  refreshOrgInfo,
  getLabels,
  refreshLabels,
  GLOBAL_STORAGE_DIR,
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

    this.defaultOrg = getOrgDisplay();

    this.onDidPose = () => {
      this.defaultOrg = getOrgDisplay();
    };

    this.handler.addApi({
      getAvailableGlobalValueSets: () => {
        try {
          getGlobalValueSets(this.defaultOrg).then((response) => {
            this.postMessage('globalValueSets', response);
          });
        } catch (e) {
          this.showErrorMessage("Couldn't get GlobalValueSets");
          this.channel.appendLine(e);
        }
      },
      getAllObjectNames: () => {
        try {
          getGlobalDescribe(this.defaultOrg).then((response) => {
            this.postMessage('objects', response.data.sobjects);
          });
        } catch (e) {
          this.showErrorMessage("Couldn't get the Objects");
          this.channel.appendLine(e);
        }
      },
      getOrgInfo: () => {
        try {
          const orgInfo = getOrgInfo();
          this.postMessage('orgInfo', orgInfo);
        } catch (e) {
          this.showErrorMessage("Couldn't get Org Info");
          this.channel.appendLine(e);
        }
      },
      getLabels: () => {
        try {
          getLabels(this.defaultOrg).then((response) => {
            this.postMessage('labels', response);
          });
        } catch (e) {
          this.showErrorMessage("Couldn't get Labels");
          this.channel.appendLine(e);
        }
      },
      createCustomObject: (data) => {
        const customObjectXml = data.xml;
        const customObjectName = data.objectName;
        const customObjectsFolder = path.join(
          GLOBAL_STORAGE_DIR,
          this.defaultOrg.username,
          'customObjects'
        );

        const customObjectFolder = path.join(
          customObjectsFolder,
          customObjectName + '__c'
        );
        fs.mkdirpSync(customObjectFolder);
        fs.mkdirpSync(path.join(customObjectFolder, 'objects'));

        fs.writeFileSync(
          path.join(customObjectFolder, 'package.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>
  <Package xmlns="http://soap.sforce.com/2006/04/metadata">
      <types>
          <members>*</members>
          <name>CustomObject</name>
      </types>
      <version>48.0</version>
  </Package>
  `, {
            encoding: 'utf8',
          }
        );

        fs.writeFileSync(
          path.join(
            customObjectFolder,
            'objects',
            customObjectName + '__c.object'
          ),
          customObjectXml, {
            encoding: 'utf8',
          }
        );

        try {
          const metadataDeployResult = execSync(
            `sfdx force:mdapi:deploy -d ${customObjectFolder} -w 90 --json`, {
              cwd: vscode.workspace.rootPath,
              encoding: 'utf8',
            }
          );

          this.channel.appendLine(metadataDeployResult.toString());
          vscode.window
            .showInformationMessage('Custom Object Created', 'Show Output')
            .then((selection) => {
              if (selection === 'Show Output') {
                this.channel.show();
              }
            });
          this.postMessage('customObjectCreated');
        } catch (e) {
          this.channel.appendLine(e.stdout);
          vscode.window
            .showErrorMessage('Deploy Failed', 'Show Output')
            .then((selection) => {
              if (selection === 'Show Output') {
                this.channel.show();
              }
            });
          this.postMessage('customObjectCreated');
        }
      },
      refreshGlobalValueSetsAndObjectsMetadata: () => {
        this.defaultOrg = getOrgDisplay();
        Promise.all([
            refreshOrgInfo(this.defaultOrg, (response) => {
              this.postMessage('orgInfo', response);
            }),
            refreshGlobalValueSets(this.defaultOrg, (response) => {
              this.postMessage('globalValueSets', response);
            }),
            refreshSObjects(this.defaultOrg, (response) => {
              this.postMessage('objects', response.data.sobjects);
            }),
            refreshLabels(this.defaultOrg, (response) => {
              this.postMessage('labels', response);
            }),
          ])
          .then(() => {
            this.panel.webview.postMessage({
              cmd: 'refreshedMetadata',
            });
          })
          .catch((e) => {
            vscode.window
              .showErrorMessage("Couldn't Refresh Metadata", 'Show Output')
              .then((selection) => {
                if (selection === 'Show Output') {
                  this.channel.show();
                }
              });
            this.panel.webview.postMessage({
              cmd: 'refreshedMetadata',
            });
            this.channel.appendLine(e);
          });
      },
      getSObjectDescribe: (sObject) => {
        callSObjectDescribe(this.defaultOrg, sObject).then((response) => {
          this.postMessage('sobjectDescribe', response.data);
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

  showErrorMessage(message) {
    vscode.window.showErrorMessage(message, 'Show Output').then((selection) => {
      if (selection === 'Show Output') {
        this.channel.show();
      }
    });
  }

  postMessage(message, data) {
    this.panel.webview.postMessage({
      cmd: message,
      data: data,
    });
  }
}

module.exports = EGWebView;