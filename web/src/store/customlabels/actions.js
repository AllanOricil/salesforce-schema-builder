export const actions = {
    getCustomLabels(context) {
        window.vscode.post({
            cmd: "getLabels"
        });
    }
};
