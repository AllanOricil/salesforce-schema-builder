import whitelistedStandardObjects from '../../../static/json/whiteListedStandardSObjectsForRelationship.json';

export const getters = {
    getSObjectByName: (state) => (apiName) => {
        return state.sobjectsWithDetails[apiName];
    },
    referenceAbleObjects: (state) => {
        return Object.values(state.sobjects)
            .filter((object) => {
                return (/^\w*__c\b$/g.test(object.name) && !object.customSetting) || whitelistedStandardObjects.sobjects.includes(object.name);
            })
            .sort(function (a, b) {
                return a.name
                    .toLowerCase()
                    .localeCompare(b.name.toLowerCase());
            });
    },
    getSObjectFields: (state) => (apiName) => {
        if (state.sobjectsWithDetails[apiName]) {
            return state.sobjectsWithDetails[apiName].fields.sort((a, b) => a.label.localeCompare(b.label));
        } else {
            return [];
        }
    }
};
