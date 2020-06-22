export const actions = {
    getAvailableGlobalValueSets(context, sobject) {
        window.vscode.post({
            cmd: "getAvailableGlobalValueSets"
        });
    }
};
