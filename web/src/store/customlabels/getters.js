export const getters = {
    getNames: (state) => {
        return state.customlabels.map(customLabel => {
            return customLabel.fullName;
        })
    },
};
