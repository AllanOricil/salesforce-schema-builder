const vscode = require("vscode");
const utils = require("../vscode/vscode.utils");
const EGWebView = require("./e.g.webview");

const name = "Schema Builder";
const webview = new EGWebView();

/**
 * @param {vscode.ExtensionContext} context
 */
const activate = (context) => {
  // example.webview
  webview.activate(context, name, "SFDX.schemaBuilder");
  // example.helloWorld
  /*context.subscriptions.push(
        vscode.commands.registerCommand('example.helloWorld', function() {
            utils.Api.showMessage({ txt: 'Hello World!' });
        })
    );*/
};

const deactivate = () => {
  webview.deactivate();
};

module.exports = {
  name,
  activate,
  deactivate,
};
