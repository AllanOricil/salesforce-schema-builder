import {
    Vscode
} from '../vscode.web';

/**
 *vscode API of business
 *
 * @class EGVscode
 * @extends {Vscode}
 */
class EGVscode extends Vscode {
    // api1() {}
    // api2() {}
    onReceiveGlobalValueSets(callback) {
        this.on('globalValueSets', callback, 0);
    }
    onReceiveObjects(callback) {
        this.on('objects', callback, 0);
    }
    onCustomObjectCreated(callback) {
        this.on('customObjectCreated', callback, 0);
    }
    onFinishRefreshMetadata(callback) {
        this.on('refreshedMetadata', callback, 0);
    }
    onReceiveSObjectDescription(callback) {
        this.on('sobjectDescribe', callback, 0);
    }
    onReceiveOrgInfo(callback) {
        this.on('orgInfo', callback, 0);
    }
    onReceiveCustomLabel(callback) {
        this.on('labels', callback, 0);
    }
}

export default EGVscode;
