import Vue from 'vue';

export const mutations = {
    setSObject(state, newSobject) {
        state.sobjectsWithDetails[newSobject.name] = newSobject
    },
    setSObjects(state, newSObjects) {
        newSObjects.forEach(newSObject => {
            Vue.set(state.sobjects, newSObject.name, newSObject)
        });
    }
};
