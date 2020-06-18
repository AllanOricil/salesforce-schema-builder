<template>
    <div class="container">
        <div class="row justify-content-between">
            <h2 class="text-uppercase mt-3 ml-3">Custom Object</h2>
            <span
                class=" icon fa fa-file-code mr-3 mt-3"
                style="font-size: 30px"
                data-placement="top"
                title="View Metadata"
                @click="displayMetadata()"
            ></span>
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
            style="position: absolute; width: 40%; height: 100%; top: 0px; right: 0px; background-color: var(--vscode-editor-background); border-left: thin solid var(--vscode-textSeparator-foreground);"
        >
            <button
                @click="hideMetadata()"
                class="btn btn-primary"
                style="min-width: 0px"
            >
                Close Preview
            </button>
            <pre
                v-highlightjs
                class="flex-grow-1"
            ><code class="html">{{data}}</code></pre>
        </div>
    </div>
</template>

<script>
import he from "he";
import format from "xml-formatter";
import SObjectForm from "./SObjectForm.vue";
import FieldsForm from "./FieldsForm.vue";
import xml2js from "xml2js";

const xmldBuilder = new xml2js.Builder();
export default {
    name: "Index",
    components: {
        SObjectForm,
        FieldsForm
    },
    computed: {
        data() {
            return xmldBuilder.buildObject(
                JSON.parse(
                    JSON.stringify({
                        CustomObject: {
                            $: {
                                xmlns: "http://soap.sforce.com/2006/04/metadata"
                            },
                            ...this.$refs.sObjectForm.sObjectDefinition,
                            fields: this.$refs.fieldsForm.data
                        }
                    })
                )
            );
        }
    },
    created() {
        window.addEventListener("message", event => {
            const message = event.data;
            if (
                this.creatingCustomObject &&
                message.name === "createCustomObjectResult"
            ) {
                this.areFormsDisabled = false;
                this.creatingCustomObject = false;
            }
        });
    },
    data() {
        return {
            msg: "",
            creatingCustomObject: false,
            areFormsDisabled: false,
            showXML: false,
            xml: format(
                `<?xml version="1.0" encoding="UTF-8"?>
    <Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <types> <members>*</members>
        <name>CustomObject</name>     </types>
    <version>48.0</version> </Package>
`,
                {
                    collapseContent: true
                }
            )
        };
    },
    methods: {
        getRootPath() {
            window.vscode.updateGlobalState({ test: "BATATA" });
            this.msg = window.webviewData.rootPath;
        },
        selectFile() {
            window.vscode.updateGlobalState({ test: "BATATA" });
            window.vscode.showOpenDialog({ canSelectFiles: true }).then(msg => {
                if (msg && msg.data) {
                    this.msg = msg.data[0];
                }
            });
        },
        output() {
            window.vscode.showTxt2Output({ txt: `this is output dialog.` });
        },
        createCustomObject() {
            if (
                this.$refs.sObjectForm.isFormValid() &&
                this.$refs.fieldsForm.isDataValid
            ) {
                this.areFormsDisabled = true;
                const fieldsData = this.$refs.fieldsForm.getData();
                const sObjectData = this.$refs.sObjectForm.sObjectDefinition;
                console.log(fieldsData);
                console.log(sObjectData);
                this.creatingCustomObject = true;
                window.vscode.post({
                    cmd: "createCustomObject",
                    args: this.$refs.fieldsForm.getData()
                });
            }
        },
        _generateCustomObjectMetadata() {},
        displayMetadata() {
            this.showXML = true;
        },
        hideMetadata() {
            this.showXML = false;
        }
    }
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
