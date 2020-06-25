const fs = require('fs-extra');
const path = require('path');

module.exports = {
    'test refresh button start spinning when user clicks on it': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#refresh-metadata-button')
            .click('#refresh-metadata-button')
            .assert.cssClassPresent('#refresh-metadata-button', 'fa-spin')
            .end();
    },
    'test refresh button stop to spin when server responds with refreshedMetadata message': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#refresh-metadata-button')
            .click('#refresh-metadata-button')
            .assert.cssClassPresent('#refresh-metadata-button', 'fa-spin')
            .execute(
                function () {
                    window.postMessage({
                        cmd: 'refreshedMetadata',
                    });
                },
                [],
                function () {
                    browser.assert.not
                        .cssClassPresent('#refresh-metadata-button', 'fa-spin')
                        .end();
                }
            );
    },
    'test metadata xml view appears when user clicks on show-xml-button': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#show-xml-button')
            .assert.not.elementPresent('#metadata-xml-view')
            .click('#show-xml-button')
            .assert.elementPresent('#metadata-xml-view')
            .end();
    },
    'test metadata xml view closes when user clicks on close-xml-button': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#show-xml-button')
            .click('#show-xml-button')
            .assert.elementPresent('#metadata-xml-view')
            .click('#close-xml-button')
            .assert.not.elementPresent('#metadata-xml-view')
            .end();
    },
    'test metadata is copied to clipboard when user clicks on copy-to-clipboard-button': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        const pathToXml = path.resolve(
            path.join('test', 'e2e', 'static', 'xml_when_page_loaded.xml')
        );

        const xml = fs
            .readFileSync(pathToXml, {
                encoding: 'utf-8',
            })
            .replace(/\s/g, '');
        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#show-xml-button')
            .click('#show-xml-button')
            .assert.elementPresent('#metadata-xml-view')
            .waitForElementVisible('#copy-to-clipboard-button')
            .click('#copy-to-clipboard-button')
            .execute(
                function () {
                    var inputToReceiveCopiedText = document.createElement(
                        'input'
                    );
                    inputToReceiveCopiedText.setAttribute(
                        'id',
                        'input-to-received-copied-text'
                    );
                    inputToReceiveCopiedText.type = 'text';

                    // adiciona o novo elemento criado e seu conteúdo ao DOM
                    var appDiv = document.getElementById('app');
                    document.body.insertBefore(
                        inputToReceiveCopiedText,
                        appDiv
                    );
                },
                [],
                function () {
                    browser
                        .click('#input-to-received-copied-text')
                        .keys([browser.Keys.CONTROL, 'v'])
                        .getValue('#input-to-received-copied-text', function (
                            result
                        ) {
                            browser.assert
                                .equal(xml, result.value.replace(/\s/g, ''))
                                .end();
                        });
                }
            );
    },
};
