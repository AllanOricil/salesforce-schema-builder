export const mutations = {
    setSObject(state, newSobject) {
        console.log('MUTATION setSObject');
        state.sobjectsWithDetails[newSobject.name] = newSobject
    },
    setSObjects(state, newSObjects) {
        console.log('MUTATION setSObjects');
        console.log(newSObjects);
        newSObjects.forEach(newSObject => {
            state.sobjects[newSObject.name] = newSObject
        });
    }
};
