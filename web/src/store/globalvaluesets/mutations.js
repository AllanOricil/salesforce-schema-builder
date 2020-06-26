export const mutations = {
    setGlobalValueSets(state, globalValueSets) {
        state.globalValueSets = Array.isArray(globalValueSets) ? globalValueSets : [globalValueSets];
    }
};
