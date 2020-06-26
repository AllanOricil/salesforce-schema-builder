// @ts-nocheck
const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');
const EGWebView = require('./e.g.webview');
const { setupSchemaGlobalDirectory } = require('../lib/utils.js');

const name = 'Schema Builder';
const webview = new EGWebView();

const HOME_DIR = require('os').homedir();
const SCHEMA_STORAGE_DIR = path.resolve(
  path.join(HOME_DIR, '.vscode', 'extensions', '.schema')
);
/**
 * @param {vscode.ExtensionContext} context
 */
const activate = (context) => {
  try {
    fs.ensureDir(SCHEMA_STORAGE_DIR);

    setupSchemaGlobalDirectory();

    webview.activate(context, name, 'SFDX.schemaBuilder');

    vscode.window.showInformationMessage(
      'Salesforce Schema Builder is Activated'
    );
  } catch (e) {
    vscode.window.showErrorMessage('Could not Activate your extension.');
  }
};

const deactivate = () => {
  webview.deactivate();
};

module.exports = {
  name,
  activate,
  deactivate,
};
