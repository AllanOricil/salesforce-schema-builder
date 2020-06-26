export const mutations = {
    setCustomLabels(state, customLabels) {
        state.customlabels = Array.isArray(customLabels) ? customLabels : [customLabels];
    }
};
