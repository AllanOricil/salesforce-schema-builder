export const actions = {
    getSObjectDescribe(context, sobject) {
        window.vscode.post({
            cmd: "getSObjectDescribe",
            args: sobject
        });
    },
    getAvailableSObjects(context) {
        window.vscode.post({
            cmd: "getAllObjectNames"
        });
    }
};
