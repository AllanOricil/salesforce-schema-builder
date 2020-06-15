<template>
    <div class="container">
        <div class="row justify-content-between">
            <h2 class="text-uppercase mt-3 ml-3">Custm Object</h2>
            <span
                class="tooltip icon fa fa-eye mr-3 mt-3"
                style="color: grey; font-size: 30px"
                data-toggle="tooltip"
                data-placement="top"
                title="View Metadata"
            ></span>
        </div>
        <div class="row h-100">
            <div id="forms-panel" class="col-3">
                <s-object-form ref="sObjectForm"></s-object-form>
            </div>
            <div class="col-9">
                <fields-form ref="fieldsForm"></fields-form>
            </div>
        </div>
        <div class="row my-2 mb-2">
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
    </div>
</template>

<script>
import SObjectForm from "./SObjectForm.vue";
import FieldsForm from "./FieldsForm.vue";
export default {
    name: "Index",
    components: {
        SObjectForm,
        FieldsForm
    },
    created() {
        window.addEventListener("message", event => {
            const message = event.data;
            if (
                this.creatingCustomObject &&
                message.name === "createCustomObjectResult"
            )
                this.creatingCustomObject = false;
        });
    },
    data() {
        return {
            msg: "",
            creatingCustomObject: false
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
            console.log(this.$refs.sObjectForm.isFormValid);
            console.log(this.$refs.fieldsForm.getData());
            const data = this.$refs.fieldsForm.getData();
            if (this.$refs.sObjectForm.isFormValid) {
                this.creatingCustomObject = true;
                window.vscode.post({
                    cmd: "createCustomObject",
                    args: data
                });
            }
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
