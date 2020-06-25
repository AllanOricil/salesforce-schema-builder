<template>
    <div class="container">
        <div class="row justify-content-between">
            <h2 class="text-uppercase mt-3 ml-3">Custom Object</h2>
            <div>
                <span
                    :class="[
                        'icon fa fa-sync mr-3 mt-3',
                        isRefreshingMetadata ? 'fa-spin' : '',
                    ]"
                    style="font-size: 30px;"
                    data-placement="top"
                    title="Refresh Metadata"
                    @click="refreshMetadata()"
                ></span>
                <span
                    class="icon fa fa-file-code mr-3 mt-3"
                    style="font-size: 30px;"
                    data-placement="top"
                    title="View Metadata"
                    @click="toogleMetadataView()"
                ></span>
            </div>
        </div>

        <fieldset :disabled="areFormsDisabled">
            <div class="row h-100">
                <div id="forms-panel" class="col-3">
                    <s-object-form ref="sObjectForm"></s-object-form>
                </div>
                <div class="col-9">
                    <fields-form ref="fieldsForm"></fields-form>
                </div>
            </div>
        </fieldset>
        <div class="row my-2 mb-4">
            <button
                id="saveSObjectButton"
                type="button"
                class="btn btn-primary mx-3 w-100"
                @click="createCustomObject"
                :disabled="creatingCustomObject"
            >
                <div v-if="creatingCustomObject">
                    <span
                        class="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    Creating...
                </div>
                <span v-else>Save</span>
            </button>
        </div>

        <div
            v-if="showXML"
            class="fixed d-flex flex-column m-auto absolute"
            style="
                position: absolute;
                width: 40%;
                height: 100%;
                top: 0px;
                right: 0px;
                background-color: var(--vscode-editor-background);
                border-left: thin solid var(--vscode-textSeparator-foreground);
            "
        >
            <div class="d-flex">
                <button
                    @click="toogleMetadataView()"
                    class="btn btn-primary flex-grow-1"
                    style="min-width: 0px;"
                >
                    Close Preview
                </button>
                <button
                    v-clipboard="xml"
                    v-clipboard:success="clipboardSuccessHandler"
                    v-clipboard:error="clipboardErrorHandler"
                    class="btn btn-primary flex-grow-1"
                    style="min-width: 0px;"
                >
                    Copy to Clipboard
                </button>
            </div>
            <pre
                v-highlightjs="xml"
                class="flex-grow-1"
            ><code class="html"></code></pre>
        </div>
    </div>
</template>

<script>
import he from 'he';
import SObjectForm from './SObjectForm.vue';
import FieldsForm from './FieldsForm.vue';
import xml2js from 'xml2js';

const xmldBuilder = new xml2js.Builder();
export default {
    name: 'Index',
    components: {
        SObjectForm,
        FieldsForm,
    },
    computed: {
        xml() {
            return he.decode(
                xmldBuilder.buildObject(
                    JSON.parse(
                        JSON.stringify({
                            CustomObject: {
                                $: {
                                    xmlns:
                                        'http://soap.sforce.com/2006/04/metadata',
                                },
                                ...this.$refs.sObjectForm.sObjecComputedData,
                                fields: this.$refs.fieldsForm
                                    .fieldsComputedData,
                            },
                        })
                    )
                )
            );
        },
    },
    beforeMount() {
        window.vscode.onCustomObjectCreated((message) => {
            this.areFormsDisabled = false;
            this.creatingCustomObject = false;
        });
        window.vscode.onFinishRefreshMetadata((message) => {
            this.isRefreshingMetadata = false;
        });
        window.vscode.onReceiveGlobalValueSets((message) => {
            this.$store.commit(
                'globalvaluesets/setGlobalValueSets',
                message.data.result
            );
            window.vscode.showMessage({
                txt: 'Global Value Sets Loaded',
            });
        });
        window.vscode.onReceiveObjects((message) => {
            this.$store.commit('sobjects/setSObjects', message.data);
            window.vscode.showMessage({
                txt: 'SObjects Loaded',
            });
        });
    },
    mounted() {
        this.$store.dispatch('globalvaluesets/getAvailableGlobalValueSets');
        this.$store.dispatch('sobjects/getAvailableSObjects');
    },
    data() {
        return {
            msg: '',
            creatingCustomObject: false,
            areFormsDisabled: false,
            showXML: false,
            isRefreshingMetadata: false,
        };
    },
    methods: {
        createCustomObject() {
            if (
                this.$refs.sObjectForm.isValid &&
                this.$refs.fieldsForm.isValid
            ) {
                this.areFormsDisabled = true;
                const fieldsData = this.$refs.fieldsForm.fieldsComputedData;
                const sObjectData = this.$refs.sObjectForm.sObjecComputedData;
                console.log(fieldsData);
                console.log(sObjectData);
                this.creatingCustomObject = true;
                window.vscode.post({
                    cmd: 'createCustomObject',
                    args: {
                        objectName: this.$refs.sObjectForm.sObjectDefinition
                            .objectName,
                        xml: this.xml,
                    },
                });
            } else {
                window.vscode.showMessage({
                    txt: 'Fix the Errors',
                });
            }
        },
        refreshMetadata() {
            window.vscode.post({
                cmd: 'refreshGlobalValueSetsAndObjectsMetadata',
            });
            this.isRefreshingMetadata = true;
        },
        toogleMetadataView() {
            this.showXML = !this.showXML;
        },
        clipboardSuccessHandler() {
            window.vscode.showMessage({
                txt: 'Copied to Clipboard',
            });
            window.vscode.getBridgeData().then((response) => {
                console.log(response);
            });
        },
        clipboardErrorHandler() {},
    },
};
</script>

<style scoped>
.sidenav {
    height: 100%; /* Full-height: remove this if you want "auto" height */
    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #111; /* Black */
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 20px;
}
</style>
