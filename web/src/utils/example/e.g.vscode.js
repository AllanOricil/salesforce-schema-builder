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
        this.on('receiveSObjectDescription', callback, 0);
    }
}

export default EGVscode;
