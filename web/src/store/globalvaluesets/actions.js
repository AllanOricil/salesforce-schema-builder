export const actions = {
    getAvailableGlobalValueSets(context) {
        window.vscode.post({
            cmd: "getAvailableGlobalValueSets"
        });
    }
};
