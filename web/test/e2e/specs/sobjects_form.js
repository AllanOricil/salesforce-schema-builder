/* eslint-disable indent */
/* eslint-disable prettier/prettier */
const fs = require('fs-extra');
const path = require('path');

module.exports = {
    'verify SObject form fields are present': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#sObjectForm')
            .assert.elementPresent('#sObjectLabel')
            .assert.elementPresent('#sObjectPluralLabel')
            .assert.elementPresent('#sObjecctGender')
            .assert.elementPresent('#sObjectDescription')
            .assert.elementPresent('#sObjectObjectName')
            .assert.elementPresent('#sObjectRecordName')
            .assert.elementPresent('#sObjectDataType')
            .assert.elementPresent('#sObjectAllowReports')
            .assert.elementPresent('#sObjectAllowActivities')
            .assert.elementPresent('#sObjectTrackFieldHistory')
            .assert.elementPresent('#sObjectAllowInChatterGroups')
            .assert.elementPresent('#sObjectAllowSharing')
            .assert.elementPresent('#sObjectAllowBulkApiAccess')
            .assert.elementPresent('#sObjectAllowStreamingApiAccess')
            .assert.elementPresent('#sObjectAllowSearch')
            .assert.elementPresent('#sObjectDeploymentStatus')
            .end();
    },
    'typing on sobject label should fill object name': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#sObjectForm')
            .assert.elementPresent('#sObjectLabel')
            .assert.elementPresent('#sObjectObjectName')
            .click('#sObjectLabel')
            .keys('ABC')
            .assert.value('#sObjectObjectName', 'ABC')
            .end();
    },
    'typing on sobject label should fill record name': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#sObjectForm')
            .assert.elementPresent('#sObjectLabel')
            .assert.elementPresent('#sObjectRecordName')
            .click('#sObjectLabel')
            .keys('ABC')
            .assert.value('#sObjectRecordName', 'ABC Name')
            .end();
    },
    'test Data Type can be Text or Auto Number': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectDataType', 5000)
            .assert.elementPresent('#sObjectDataType')
            .click('#sObjectDataType option[value=Text]')
            .assert.value('#sObjectDataType', 'Text')
            .saveScreenshot('./test/e2e/reports/valid_data_type_text.png')
            .click('#sObjectDataType option[value=AutoNumber]')
            .assert.value('#sObjectDataType', 'AutoNumber')
            .saveScreenshot('./test/e2e/reports/valid_data_type_autonumber.png')
            .end();
    },
    'change data type to Auto Number renders display format and starting number': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectDataType', 5000)
            .assert.elementPresent('#sObjectDataType')
            .click('#sObjectDataType option[value=AutoNumber]')
            .saveScreenshot(
                './test/e2e/reports/autonumber_renders_display_format_and_starting_number.png'
            )
            .end();
    },
    'test Display Format valid Input': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectDataType', 5000)
            .assert.elementPresent('#sObjectDataType')
            .click('#sObjectDataType option[value=AutoNumber]')
            .waitForElementVisible('#sObjectDisplayFormat')
            .click('#sObjectDisplayFormat')
            .keys('A-{000000000}')
            .assert.isValidInput('#sObjectDisplayFormat', 'valid', true)
            .saveScreenshot('./test/e2e/reports/valid_display_format.png')
            .end();
    },
    'test Display Format can have 0 or at most 20 characters before {0} sequence': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectDataType', 5000)
            .assert.elementPresent('#sObjectDataType')
            .click('#sObjectDataType option[value=AutoNumber]')
            .waitForElementVisible('#sObjectDisplayFormat')
            .click('#sObjectDisplayFormat')
            .keys('{0000000000}')
            .assert.isValidInput('#sObjectDisplayFormat', 'valid', true)
            .saveScreenshot('./test/e2e/reports/valid_display_format1.png')
            .clearValue('#sObjectDisplayFormat')
            .click('#sObjectDisplayFormat')
            .keys('AAAAAAAAAAAAAAAAAAA-{0000000000}')
            .assert.isValidInput('#sObjectDisplayFormat', 'valid', true)
            .saveScreenshot('./test/e2e/reports/valid_display_format2.png')
            .clearValue('#sObjectDisplayFormat')
            .click('#sObjectDisplayFormat')
            .keys('AAAAAAAAAAAAAAAAAAAA-{0000000000}')
            .assert.isValidInput('#sObjectDisplayFormat', 'valid', false)
            .saveScreenshot('./test/e2e/reports/valid_display_format3.png')
            .end();
    },
    'test Display Format must have at least 1 Zero and at most 10 zeros inside {} to be valid': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectDataType', 5000)
            .assert.elementPresent('#sObjectDataType')
            .click('#sObjectDataType option[value=AutoNumber]')
            .waitForElementVisible('#sObjectDisplayFormat')
            .click('#sObjectDisplayFormat')
            .keys('A-{0}')
            .assert.isValidInput('#sObjectDisplayFormat', 'valid', true)
            .saveScreenshot('./test/e2e/reports/valid_display_format{0}.png')
            .clearValue('#sObjectDisplayFormat')
            .click('#sObjectDisplayFormat')
            .keys('A-{00}')
            .assert.isValidInput('#sObjectDisplayFormat', 'valid', true)
            .saveScreenshot('./test/e2e/reports/valid_display_format{00}.png')
            .clearValue('#sObjectDisplayFormat')
            .click('#sObjectDisplayFormat')
            .keys('A-{000}')
            .assert.isValidInput('#sObjectDisplayFormat', 'valid', true)
            .saveScreenshot('./test/e2e/reports/valid_display_format{000}.png')
            .clearValue('#sObjectDisplayFormat')
            .click('#sObjectDisplayFormat')
            .keys('A-{0000}')
            .assert.isValidInput('#sObjectDisplayFormat', 'valid', true)
            .saveScreenshot('./test/e2e/reports/valid_display_format{0000}.png')
            .clearValue('#sObjectDisplayFormat')
            .click('#sObjectDisplayFormat')
            .keys('A-{00000}')
            .assert.isValidInput('#sObjectDisplayFormat', 'valid', true)
            .saveScreenshot(
                './test/e2e/reports/valid_display_format{00000}.png'
            )
            .clearValue('#sObjectDisplayFormat')
            .click('#sObjectDisplayFormat')
            .keys('A-{000000}')
            .assert.isValidInput('#sObjectDisplayFormat', 'valid', true)
            .saveScreenshot(
                './test/e2e/reports/valid_display_format{000000}.png'
            )
            .clearValue('#sObjectDisplayFormat')
            .click('#sObjectDisplayFormat')
            .keys('A-{0000000}')
            .assert.isValidInput('#sObjectDisplayFormat', 'valid', true)
            .saveScreenshot(
                './test/e2e/reports/valid_display_format{0000000}.png'
            )
            .clearValue('#sObjectDisplayFormat')
            .click('#sObjectDisplayFormat')
            .keys('A-{00000000}')
            .assert.isValidInput('#sObjectDisplayFormat', 'valid', true)
            .saveScreenshot(
                './test/e2e/reports/valid_display_format{00000000}.png'
            )
            .clearValue('#sObjectDisplayFormat')
            .click('#sObjectDisplayFormat')
            .keys('A-{000000000}')
            .assert.isValidInput('#sObjectDisplayFormat', 'valid', true)
            .saveScreenshot(
                './test/e2e/reports/valid_display_format{000000000}.png'
            )
            .clearValue('#sObjectDisplayFormat')
            .click('#sObjectDisplayFormat')
            .keys('A-{0000000000}')
            .assert.isValidInput('#sObjectDisplayFormat', 'valid', true)
            .saveScreenshot(
                './test/e2e/reports/valid_display_format{0000000000}.png'
            )
            .clearValue('#sObjectDisplayFormat')
            .click('#sObjectDisplayFormat')
            .keys('A-{00000000000}')
            .assert.isValidInput('#sObjectDisplayFormat', 'valid', false)
            .saveScreenshot(
                './test/e2e/reports/invalid_display_format_{00000000000}.png'
            )
            .end();
    },
    'test empty Label is invalid': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectLabel', 5000)
            .assert.elementPresent('#sObjectLabel')
            .assert.isValidInput('#sObjectLabel', 'valid', false)
            .saveScreenshot('./test/e2e/reports/label_invalid_empty.png')
            .end();
    },
    'test Label can only have 40 characters': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectLabel', 5000)
            .assert.elementPresent('#sObjectLabel')
            .click('#sObjectLabel')
            .keys('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbb')
            .assert.isValidInput('#sObjectLabel', 'valid', true)
            .assert.attributeEquals(
                '#sObjectLabel',
                'value',
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
            )
            .saveScreenshot('./test/e2e/reports/valid_label_40_characters.png')
            .end();
    },
    'test Label must have at least one character': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectLabel', 5000)
            .assert.elementPresent('#sObjectLabel')
            .click('#sObjectLabel')
            .keys('a')
            .assert.isValidInput('#sObjectLabel', 'valid', true)
            .saveScreenshot(
                './test/e2e/reports/valid_label_at_least_1_character.png'
            )
            .end();
    },
    'test empty Plural Label is invalid': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectPluralLabel', 5000)
            .assert.elementPresent('#sObjectPluralLabel')
            .assert.isValidInput('#sObjectPluralLabel', 'valid', false)
            .saveScreenshot('./test/e2e/reports/plural_label_invalid_empty.png')
            .end();
    },
    'test Plural Label can only have 40 characters': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectPluralLabel', 5000)
            .assert.elementPresent('#sObjectPluralLabel')
            .click('#sObjectPluralLabel')
            .keys('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbb')
            .assert.isValidInput('#sObjectPluralLabel', 'valid', true)
            .assert.attributeEquals(
                '#sObjectPluralLabel',
                'value',
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
            )
            .saveScreenshot(
                './test/e2e/reports/valid_plural_label_40_characters.png'
            )
            .end();
    },
    'test Plural Label must have at least one character': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectPluralLabel', 5000)
            .assert.elementPresent('#sObjectPluralLabel')
            .click('#sObjectPluralLabel')
            .keys('a')
            .assert.isValidInput('#sObjectPluralLabel', 'valid', true)
            .saveScreenshot(
                './test/e2e/reports/valid_plural_label_at_least_1_character.png'
            )
            .end();
    },
    'test Gender can be Feminine or Masculine': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjecctGender', 5000)
            .assert.elementPresent('#sObjecctGender')
            .click('#sObjecctGender option[value=Feminine]')
            .assert.value('#sObjecctGender', 'Feminine')
            .saveScreenshot('./test/e2e/reports/valid_gender_feminine.png')
            .click('#sObjecctGender option[value=Masculine]')
            .assert.value('#sObjecctGender', 'Masculine')
            .saveScreenshot('./test/e2e/reports/valid_gender_masculine.png')
            .end();
    },
    'test Description can only have 999 characters': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectDescription', 5000)
            .assert.elementPresent('#sObjectDescription')
            .click('#sObjectDescription')
            .keys(
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab'
            )
            .assert.isValidInput('#sObjectDescription', 'valid', true)
            .assert.attributeEquals(
                '#sObjectDescription',
                'value',
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
            )
            .saveScreenshot(
                './test/e2e/reports/valid_description_999_characters.png'
            )
            .end();
    },
    'test Object Name valid Input': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectObjectName', 5000)
            .assert.elementPresent('#sObjectObjectName')
            .click('#sObjectObjectName')
            .keys('ABC_DEF')
            .assert.isValidInput('#sObjectObjectName', 'valid', true)
            .saveScreenshot('./test/e2e/reports/valid_object_name.png')
            .end();
    },
    'test Object Name can not start with a underscore character': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectObjectName', 5000)
            .assert.elementPresent('#sObjectObjectName')
            .click('#sObjectObjectName')
            .keys('_ABC_DEF')
            .assert.isValidInput('#sObjectObjectName', 'valid', false)
            .saveScreenshot('./test/e2e/reports/object_name_invalid1.png')
            .end();
    },
    'test Object Name can not start with a Number': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectObjectName', 5000)
            .assert.elementPresent('#sObjectObjectName')
            .click('#sObjectObjectName')
            .keys('0ABC_DEF')
            .assert.isValidInput('#sObjectObjectName', 'valid', false)
            .saveScreenshot('./test/e2e/reports/object_name_invalid2.png')
            .end();
    },
    'test Object Name can have only Alphanumeric characters': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectObjectName', 5000)
            .assert.elementPresent('#sObjectObjectName')
            .click('#sObjectObjectName')
            .keys('ABC_@DEF')
            .assert.isValidInput('#sObjectObjectName', 'valid', false)
            .saveScreenshot('./test/e2e/reports/object_name_invalid3.png')
            .end();
    },
    'test Object Name can not end with underscore character': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectObjectName', 5000)
            .assert.elementPresent('#sObjectObjectName')
            .click('#sObjectObjectName')
            .keys('ABC_DEF_')
            .assert.isValidInput('#sObjectObjectName', 'valid', false)
            .saveScreenshot('./test/e2e/reports/object_name_invalid4.png')
            .end();
    },
    'test Object Name can not have two consecultive underscore characters': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectObjectName', 5000)
            .assert.elementPresent('#sObjectObjectName')
            .click('#sObjectObjectName')
            .keys('ABC__DEF')
            .assert.isValidInput('#sObjectObjectName', 'valid', false)
            .saveScreenshot('./test/e2e/reports/object_name_invalid5.png')
            .end();
    },
    'test empty Record Name is invalid': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectRecordName', 5000)
            .assert.elementPresent('#sObjectRecordName')
            .assert.isValidInput('#sObjectRecordName', 'valid', false)
            .saveScreenshot('./test/e2e/reports/valid_record_name_invalid1.png')
            .end();
    },
    'test Record Name can not have more than 80 characters': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectRecordName', 5000)
            .assert.elementPresent('#sObjectRecordName')
            .click('#sObjectRecordName')
            .keys(
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab'
            )
            .assert.isValidInput('#sObjectRecordName', 'valid', true)
            .assert.attributeEquals(
                '#sObjectRecordName',
                'value',
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
            )
            .saveScreenshot(
                './test/e2e/reports/valid_record_name_80_characters.png'
            )
            .end();
    },
    'test Record Name changes when Label changes': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .waitForElementVisible('#sObjectLabel', 5000)
            .assert.elementPresent('#sObjectLabel')
            .assert.elementPresent('#sObjectRecordName')
            .click('#sObjectLabel')
            .keys('ABC EFG')
            .assert.attributeEquals(
                '#sObjectRecordName',
                'value',
                'ABC EFG Name'
            )
            .saveScreenshot(
                './test/e2e/reports/valid_record_name_changing_when_label_changes.png'
            )
            .end();
    },
    'test sobject form can be submited when it all its fields are valid': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#sObjectForm')
            .assert.elementPresent('#sObjectLabel')
            .assert.elementPresent('#sObjectPluralLabel')
            .assert.elementPresent('#sObjecctGender')
            .assert.elementPresent('#sObjectDescription')
            .assert.elementPresent('#sObjectObjectName')
            .assert.elementPresent('#sObjectRecordName')
            .assert.elementPresent('#sObjectDataType')
            .assert.elementPresent('#sObjectAllowReports')
            .assert.elementPresent('#sObjectAllowActivities')
            .assert.elementPresent('#sObjectTrackFieldHistory')
            .assert.elementPresent('#sObjectAllowInChatterGroups')
            .assert.elementPresent('#sObjectAllowSharing')
            .assert.elementPresent('#sObjectAllowBulkApiAccess')
            .assert.elementPresent('#sObjectAllowStreamingApiAccess')
            .assert.elementPresent('#sObjectAllowSearch')
            .assert.elementPresent('#sObjectDeploymentStatus')
            .assert.elementPresent('#sObjectLabel')
            .assert.elementPresent('#sObjectRecordName')
            .click('#sObjectLabel')
            .keys('ABC DEFG')
            .click('#sObjectPluralLabel')
            .keys('ABC DEFG')
            .assert.isValidInput('#sObjectLabel', 'valid', true)
            .assert.isValidInput('#sObjectPluralLabel', 'valid', true)
            .assert.isValidInput('#sObjecctGender', 'valid', true)
            .assert.isValidInput('#sObjectDescription', 'valid', true)
            .assert.isValidInput('#sObjectObjectName', 'valid', true)
            .assert.isValidInput('#sObjectRecordName', 'valid', true)
            .assert.isValidInput('#sObjectDataType', 'valid', true)
            .assert.isValidInput('#sObjectAllowReports', 'valid', true)
            .assert.isValidInput('#sObjectAllowActivities', 'valid', true)
            .assert.isValidInput('#sObjectTrackFieldHistory', 'valid', true)
            .assert.isValidInput('#sObjectAllowInChatterGroups', 'valid', true)
            .assert.isValidInput('#sObjectAllowSharing', 'valid', true)
            .assert.isValidInput('#sObjectAllowBulkApiAccess', 'valid', true)
            .assert.isValidInput(
                '#sObjectAllowStreamingApiAccess',
                'valid',
                true
            )
            .assert.isValidInput('#sObjectAllowSearch', 'valid', true)
            .assert.isValidInput('#sObjectDeploymentStatus', 'valid', true)
            .assert.isValidInput('#sObjectLabel', 'valid', true)
            .assert.isValidInput('#sObjectRecordName', 'valid', true)
            .assert.attributeEquals('#saveSObjectButton', 'outerText', 'Save')
            .click('#saveSObjectButton')
            .assert.attributeEquals('#saveSObjectButton', 'disabled', 'true')
            .assert.attributeEquals(
                '#saveSObjectButton',
                'outerText',
                ' Deploying...'
            )
            .saveScreenshot('./test/e2e/reports/submiting_valid_form.png')
            .execute(
                function () {
                    window.postMessage({
                        cmd: 'customObjectCreated',
                    });
                },
                [],
                null
            )
            .assert.attributeEquals('#saveSObjectButton', 'outerText', 'Save')
            .end();
    },
    'test that toogling on Allow Sharing will toogle Allow Streaming Api and Allow Bulk Api': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#sObjectAllowSharing')
            .execute(
                function () {
                    document.getElementById('sObjectAllowSharing').click();
                },
                [],
                null
            )
            .execute(
                function () {
                    let sObjectAllowSharing = document.querySelector(
                        '#sObjectAllowSharing + .checkmark'
                    );
                    let sObjectAllowBulkApiAccess = document.querySelector(
                        '#sObjectAllowBulkApiAccess + .checkmark'
                    );
                    let sObjectAllowStreamingApiAccess = document.querySelector(
                        '#sObjectAllowStreamingApiAccess + .checkmark'
                    );
                    return (
                        window
                        .getComputedStyle(sObjectAllowSharing, 'after')
                        .getPropertyValue('display') === 'block' &&
                        window
                        .getComputedStyle(
                            sObjectAllowBulkApiAccess,
                            'after'
                        )
                        .getPropertyValue('display') === 'block' &&
                        window
                        .getComputedStyle(
                            sObjectAllowStreamingApiAccess,
                            'after'
                        )
                        .getPropertyValue('display') === 'block'
                    );
                },
                [],
                function (result) {
                    browser
                        .moveToElement('#saveSObjectButton', 10, 10)
                        .assert.equal(result.value, true)
                        .saveScreenshot(
                            './test/e2e/reports/toogle_allow_sharing_checkbox.png'
                        );
                }
            )
            .end();
    },
    'test that toogling on Allow Bulk Api will toogle Allow Sharing and Allow Streaming Api': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#sObjectAllowBulkApiAccess')
            .execute(
                function () {
                    document
                        .getElementById('sObjectAllowBulkApiAccess')
                        .click();
                },
                [],
                null
            )
            .execute(
                function () {
                    let sObjectAllowSharing = document.querySelector(
                        '#sObjectAllowSharing + .checkmark'
                    );
                    let sObjectAllowBulkApiAccess = document.querySelector(
                        '#sObjectAllowBulkApiAccess + .checkmark'
                    );
                    let sObjectAllowStreamingApiAccess = document.querySelector(
                        '#sObjectAllowStreamingApiAccess + .checkmark'
                    );
                    return (
                        window
                        .getComputedStyle(sObjectAllowSharing, 'after')
                        .getPropertyValue('display') === 'block' &&
                        window
                        .getComputedStyle(
                            sObjectAllowBulkApiAccess,
                            'after'
                        )
                        .getPropertyValue('display') === 'block' &&
                        window
                        .getComputedStyle(
                            sObjectAllowStreamingApiAccess,
                            'after'
                        )
                        .getPropertyValue('display') === 'block'
                    );
                },
                [],
                function (result) {
                    browser
                        .moveToElement('#saveSObjectButton', 10, 10)
                        .assert.equal(result.value, true)
                        .saveScreenshot(
                            './test/e2e/reports/toogle_allow_bulk_api_checkbox.png'
                        );
                }
            )
            .end();
    },
    'test that toogling on Allow Streaming Api will toogle Allow Sharing and Allow bulk Api': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('#sObjectAllowStreamingApiAccess')
            .execute(
                function () {
                    document
                        .getElementById('sObjectAllowStreamingApiAccess')
                        .click();
                },
                [],
                null
            )
            .execute(
                function () {
                    let sObjectAllowSharing = document.querySelector(
                        '#sObjectAllowSharing + .checkmark'
                    );
                    let sObjectAllowBulkApiAccess = document.querySelector(
                        '#sObjectAllowBulkApiAccess + .checkmark'
                    );
                    let sObjectAllowStreamingApiAccess = document.querySelector(
                        '#sObjectAllowStreamingApiAccess + .checkmark'
                    );
                    return (
                        window
                        .getComputedStyle(sObjectAllowSharing, 'after')
                        .getPropertyValue('display') === 'block' &&
                        window
                        .getComputedStyle(
                            sObjectAllowBulkApiAccess,
                            'after'
                        )
                        .getPropertyValue('display') === 'block' &&
                        window
                        .getComputedStyle(
                            sObjectAllowStreamingApiAccess,
                            'after'
                        )
                        .getPropertyValue('display') === 'block'
                    );
                },
                [],
                function (result) {
                    browser
                        .moveToElement('#saveSObjectButton', 10, 10)
                        .assert.equal(result.value, true)
                        .saveScreenshot(
                            './test/e2e/reports/toogle_allow_streaming_api_checkbox.png'
                        );
                }
            )
            .end();
    },
    'test a valid XML is generated when user changes the form': function (
        browser
    ) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .click('#sObjectLabel')
            .keys('ABC')
            .click('#sObjectPluralLabel')
            .keys('ABC')
            .click('#sObjectDescription')
            .keys('ABC')
            .execute(
                function () {
                    document.getElementById('sObjectAllowReports').click();
                    document.getElementById('sObjectAllowActivities').click();
                    document.getElementById('sObjectTrackFieldHistory').click();
                    document
                        .getElementById('sObjectAllowInChatterGroups')
                        .click();
                    document.getElementById('sObjectAllowSharing').click();
                    document
                        .getElementById('sObjectAllowBulkApiAccess')
                        .click();
                    document
                        .getElementById('sObjectAllowStreamingApiAccess')
                        .click();
                    document.getElementById('sObjectAllowSearch').click();
                },
                [],
                function () {
                    browser
                        .execute(
                            function () {
                                const vue = document.getElementById('app')
                                    .__vue__;
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
                                        'sobject_valid_form.xml'
                                    )
                                );

                                const xml = fs
                                    .readFileSync(pathToXml, {
                                        encoding: 'utf-8',
                                    })
                                    .replace(/\s/g, '');

                                browser.assert.equal(
                                    result.value.replace(/\s/g, ''),
                                    xml
                                );
                            }
                        )
                        .end();
                }
            );
    },
};
