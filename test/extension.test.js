const assert = require('assert');
const vscode = require('vscode');
const EGWebView = require('../src/example/e.g.webview');

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function () {

	// Defines a Mocha unit test
	test("Something 1", function () {
		assert.equal(-1, [1, 2, 3].indexOf(5));
		assert.equal(-1, [1, 2, 3].indexOf(0));

		const webview = new EGWebView();
		vscode.commands.executeCommand('SFDX.schemaBuilder');
	});
});