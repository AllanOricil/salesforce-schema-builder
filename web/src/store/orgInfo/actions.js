export const actions = {
    getOrgInfo(context) {
        window.vscode.post({
            cmd: 'getOrgInfo',
        });
    }
};
