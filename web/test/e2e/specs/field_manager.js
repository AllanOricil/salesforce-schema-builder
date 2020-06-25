const fs = require('fs-extra');
const path = require('path');

module.exports = {
    'test new view is added when the user clicks on the new field button': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#add-field-button')
            .assert.elementPresent('#field-manager-container')
            .click('#add-field-button')
            .assert.elementPresent('#field-0')
            .click('#add-field-button')
            .assert.elementPresent('#field-1')
            .end();
    },
    'test field is deleted when user clicks on delete button': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#add-field-button')
            .assert.elementPresent('#field-manager-container')
            .click('#add-field-button')
            .assert.elementPresent('#field-0')
            .click('#delete-button-0')
            .assert.not.elementPresent('#field-0')
            .end();
    },
    'test field is marked as is Editing when user clicks on edit button': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#add-field-button')
            .assert.elementPresent('#field-manager-container')
            .click('#add-field-button')
            .assert.elementPresent('#field-0')
            .click('#add-field-button')
            .assert.elementPresent('#field-1')
            .click('#edit-button-0')
            .assert.cssClassPresent('#field-0', 'isEditing')
            .assert.not.cssClassPresent('#field-1', 'isEditing')
            .end();
    },
    'test field in the middle can be deleted': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#add-field-button')
            .assert.elementPresent('#field-manager-container')
            .click('#add-field-button')
            .assert.elementPresent('#field-0')
            .click('#add-field-button')
            .assert.elementPresent('#field-1')
            .click('#add-field-button')
            .assert.elementPresent('#field-2')
            .click('#delete-button-1')
            .assert.not.attributeEquals(
                '#field-1 > span.my-auto.mr-3.w-100.text-truncate',
                'outerText',
                'New_Field_1__c'
            )
            .assert.attributeEquals(
                '#field-1 > span.my-auto.mr-3.w-100.text-truncate',
                'outerText',
                'New_Field_2__c'
            )
            .end();
    },
    'test field in the end can be deleted': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#add-field-button')
            .assert.elementPresent('#field-manager-container')
            .click('#add-field-button')
            .assert.elementPresent('#field-0')
            .click('#add-field-button')
            .assert.elementPresent('#field-1')
            .click('#add-field-button')
            .assert.elementPresent('#field-2')
            .click('#delete-button-2')
            .assert.not.elementPresent('#field-2')
            .assert.not.attributeEquals(
                '#field-1 > span.my-auto.mr-3.w-100.text-truncate',
                'outerText',
                'New_Field_2__c'
            )
            .assert.attributeEquals(
                '#field-1 > span.my-auto.mr-3.w-100.text-truncate',
                'outerText',
                'New_Field_1__c'
            )
            .end();
    },
    'test that only fields that contains the search input value appear': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#add-field-button')
            .assert.elementPresent('#field-manager-container')
            .assert.elementPresent('#search-field-input')
            .click('#add-field-button')
            .assert.elementPresent('#field-0')
            .click('#add-field-button')
            .assert.elementPresent('#field-1')
            .click('#add-field-button')
            .assert.elementPresent('#field-2')
            .click('#search-field-input')
            .keys('_1_')
            .assert.elementPresent('#field-0')
            .assert.not.elementPresent('#field-1')
            .assert.not.elementPresent('#field-2')
            .assert.attributeEquals(
                '#field-0 > span.my-auto.mr-3.w-100.text-truncate',
                'outerText',
                'New_Field_1__c'
            )
            .end();
    },
    'test that adding a field chnages the xml': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#add-field-button')
            .assert.elementPresent('#field-manager-container')
            .click('#add-field-button')
            .assert.elementPresent('#field-0')
            .execute(
                function () {
                    const vue = document.getElementById('app').__vue__;
                    const app = vue.$children[0];
                    const indexComponent = app.$children[0];
                    return indexComponent.xml;
                },
                [],
                function (result) {
                    const pathToXml = path.resolve(
                        path.join(
                            'test',
                            'e2e',
                            'static',
                            'field_manager_with_one_field.xml'
                        )
                    );

                    const xml = fs
                        .readFileSync(pathToXml, {
                            encoding: 'utf-8',
                        })
                        .replace(/\s/g, '');

                    browser.assert
                        .equal(result.value.replace(/\s/g, ''), xml)
                        .end();
                }
            );
    },
    'test that removing a field chnages the xml': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#add-field-button')
            .assert.elementPresent('#field-manager-container')
            .click('#add-field-button')
            .assert.elementPresent('#field-0')
            .click('#add-field-button')
            .assert.elementPresent('#field-1')
            .execute(
                function () {
                    const vue = document.getElementById('app').__vue__;
                    const app = vue.$children[0];
                    const indexComponent = app.$children[0];
                    return indexComponent.xml;
                },
                [],
                function (result1) {
                    const pathToXml1 = path.resolve(
                        path.join(
                            'test',
                            'e2e',
                            'static',
                            'field_manager_with_two_fields.xml'
                        )
                    );

                    const xml1 = fs
                        .readFileSync(pathToXml1, {
                            encoding: 'utf-8',
                        })
                        .replace(/\s/g, '');

                    browser.assert
                        .equal(result1.value.replace(/\s/g, ''), xml1)
                        .click('#delete-button-1')
                        .execute(
                            function () {
                                const vue = document.getElementById('app')
                                    .__vue__;
                                const app = vue.$children[0];
                                const indexComponent = app.$children[0];
                                return indexComponent.xml;
                            },
                            [],
                            function (result2) {
                                const pathToXml2 = path.resolve(
                                    path.join(
                                        'test',
                                        'e2e',
                                        'static',
                                        'field_manager_with_one_field.xml'
                                    )
                                );

                                const xml2 = fs
                                    .readFileSync(pathToXml2, {
                                        encoding: 'utf-8',
                                    })
                                    .replace(/\s/g, '');

                                browser.assert.equal(
                                    result2.value.replace(/\s/g, ''),
                                    xml2
                                );
                            }
                        );
                }
            );
    },
};
