<template>
    <form class="m-2 mb-5" ref="sObjectForm">
        <h2 class="text-left text-uppercase mb-3">New Object</h2>
        <div class="form-row">
            <div class="form-group col-12">
                <label for="sObjectLabel">Label</label>
                <input
                    type="text"
                    class="form-control"
                    id="sObjectLabel"
                    maxlength="40"
                    required
                    v-model="sObjectDefinition.label"
                />
            </div>
            <div class="form-group col-12">
                <label for="sObjectPluralLabel">Plural Label</label>
                <input
                    type="text"
                    class="form-control"
                    id="sObjectPluralLabel"
                    maxlength="40"
                    required
                    v-model="sObjectDefinition.pluralLabel"
                />
            </div>
            <div class="form-group col-12">
                <label for="sObjecctGender">Gender</label>
                <select
                    class="form-control"
                    id="sObjecctGender"
                    required
                    v-model="sObjectDefinition.gender"
                >
                    <option>Feminine</option>
                    <option>Masculine</option>
                </select>
            </div>
            <div class="form-group col-12">
                <label for="sObjectDescription">Description</label>
                <textarea
                    class="form-control"
                    id="sObjectDescription"
                    rows="3"
                    v-model="sObjectDefinition.description"
                ></textarea>
            </div>
            <div class="form-group col-12">
                <label for="sObjectObjectName">Object Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="sObjectObjectName"
                    maxlength="43"
                    required
                    pattern="^(?!.*__)(?!.*_$)[A-Za-z]\w*$"
                    v-model="sObjectDefinition.objectName"
                />
            </div>
            <div class="form-group col-12">
                <label for="sObjectRecordName">Record Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="sObjectRecordName"
                    maxlength="80"
                    required
                    v-model="sObjectDefinition.recordName"
                />
                <small id="passwordHelpBlock" class="form-text text-muted">
                    It appears in page layouts, key and related lists, lookups,
                    and search results.
                </small>
            </div>
            <div class="form-group col-12">
                <label for="sObjectDataType">Data Type</label>
                <select
                    class="form-control"
                    id="sObjectDataType"
                    required
                    v-model="sObjectDefinition.dataType"
                >
                    <option value="Text">Text</option>
                    <option value="AutoNumber">Auto Number</option>
                </select>
            </div>
            <div
                v-if="sObjectDefinition.dataType === 'AutoNumber'"
                class="form-group col-12"
            >
                <label for="sObjectDisplayFormat">Display Format</label>
                <input
                    type="text"
                    class="form-control"
                    id="sObjectDisplayFormat"
                    maxlength="32"
                    required
                    pattern=".{0,20}\{[0]{1,10}\}"
                    v-model="sObjectDefinition.displayFormat"
                />
                <small id="passwordHelpBlock" class="form-text text-muted"
                    >A-{0000}</small
                >
            </div>
            <div
                v-if="sObjectDefinition.dataType === 'AutoNumber'"
                class="form-group col-12"
            >
                <label for="Starting Number">Starting Number</label>
                <input
                    type="number"
                    class="form-control"
                    id="Starting Number"
                    min="0"
                    required
                    v-model="sObjectDefinition.startingNumber"
                />
            </div>
            <div class="form-group col-12">
                <label
                    class="form-check-label container"
                    for="sObjectAllowReports"
                >
                    Allow Reports
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="sObjectAllowReports"
                        v-model="sObjectDefinition.enableReports"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="form-group col-12">
                <label
                    class="form-check-label container"
                    for="sObjectAllowActivities"
                >
                    Allow Activities
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="sObjectAllowActivities"
                        v-model="sObjectDefinition.enableActivities"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="form-group col-12">
                <label
                    class="form-check-label container"
                    for="sObjectTrackFieldHistory"
                >
                    Track Field History
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="sObjectTrackFieldHistory"
                        v-model="sObjectDefinition.enableHistory"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="form-group col-12">
                <label
                    class="form-check-label container"
                    for="sObjectAllowInChatterGroups"
                >
                    Allow in Chatter Groups
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="sObjectAllowInChatterGroups"
                        v-model="sObjectDefinition.allowInChatterGroups"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="form-group col-12">
                <label
                    class="form-check-label container"
                    for="sObjectAllowSharing"
                >
                    Allow Sharing
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="sObjectAllowSharing"
                        v-model="sObjectDefinition.enableSharing"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="form-group col-12">
                <label
                    class="form-check-label container"
                    for="sObjectAllowBulkApiAccess"
                >
                    Allow Bulk API Access
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="sObjectAllowBulkApiAccess"
                        v-model="sObjectDefinition.enableBulkApi"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="form-group col-12">
                <label
                    class="form-check-label container"
                    for="sObjectAllowStreamingApiAccess"
                >
                    Allow Streaming API Access
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="sObjectAllowStreamingApiAccess"
                        v-model="sObjectDefinition.enableStreamingApi"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="form-group col-12">
                <label
                    class="form-check-label container"
                    for="sObjectAllowSearch"
                >
                    Allow Search
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="sObjectAllowSearch"
                        v-model="sObjectDefinition.enableSearch"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>

            <div class="form-group col-12">
                <label for="sObjectDeploymentStatus">Deployment Status</label>
                <select
                    class="form-control"
                    id="sObjectDeploymentStatus"
                    v-model="sObjectDefinition.deploymentStatus"
                >
                    <option value="InDevelopment">In Development</option>
                    <option value="Deployed">Deployed</option>
                </select>
            </div>

            <button
                type="submit"
                class="btn btn-primary col-12"
                @click="sendFormDataToVSCode()"
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
                <span v-else>Create</span>
            </button>
        </div>
    </form>
</template>

<script>
export default {
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
            sObjectDefinition: {
                name: undefined,
                label: undefined,
                objectName: undefined,
                description: undefined,
                pluralLabel: undefined,
                gender: "Feminine",
                recordName: undefined,
                dataType: "Text",
                displayFormat: undefined,
                startingNumber: 0,
                enableReports: false,
                enableActivities: false,
                enableHistory: false,
                allowInChatterGroups: false,
                enableSharing: false,
                enableBulkApi: false,
                enableStreamingApi: false,
                enableSearch: false,
                deploymentStatus: "Deployed"
            },
            creatingCustomObject: false
        };
    },
    watch: {
        "sObjectDefinition.label"(newValue, oldValue) {
            this.sObjectDefinition.objectName = this.sObjectDefinition.label.replace(
                /\s/g,
                "_"
            );
            this.sObjectDefinition.name = this.sObjectDefinition.label;
            this.sObjectDefinition.recordName =
                this.sObjectDefinition.label + " Name";
        },
        "sObjectDefinition.enableSharing"(newValue, oldValue) {
            this.sObjectDefinition.enableBulkApi = newValue === true;
            this.sObjectDefinition.enableStreamingApi = newValue === true;
        },
        "sObjectDefinition.enableStreamingApi"(newValue, oldValue) {
            this.sObjectDefinition.enableSharing = newValue === true;
            this.sObjectDefinition.enableBulkApi = newValue === true;
        },
        "sObjectDefinition.enableBulkApi"(newValue, oldValue) {
            this.sObjectDefinition.enableSharing = newValue === true;
            this.sObjectDefinition.enableStreamingApi = newValue === true;
        }
    },
    methods: {
        sendFormDataToVSCode(e) {
            //validate API NAme Regex /^(?!.*__)(?!.*_$)[A-Za-z]\w*$/
            //validate displayFormat Regex /.{0,20}{[0]{1,10}}/
            if (this.$refs.sObjectForm.checkValidity() !== false) {
                this.creatingCustomObject = true;
                window.vscode.post({
                    cmd: "createCustomObject",
                    args: this.sObjectDefinition
                });
            }
        }
    }
};
</script>

<style scoped>
.form-group {
    padding: 0 !important;
}

input,
textarea,
select {
    border: 1px solid transparent !important;
    border-radius: 0;
    background-color: var(--vscode-input-background);
    color: var(--vscode-input-foreground);
}

input:focus,
textarea:focus,
select:focus {
    outline: none;
    border: 1px solid var(--vscode-focusBorder) !important;
    background-color: var(--vscode-input-background);
    color: var(--vscode-input-foreground);
    box-shadow: none;
}

::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: var(--vscode-input-placeholderForeground);
    opacity: 1;
    /* Firefox */
}

label {
    color: var(--vscode-menu-foreground);
    font-family: var(--vscode-font-family);
    font-weight: var(--vscode-font-weight);
    font-size: var(--vscode-font-size);
}

h2 {
    color: var(--vscode-menu-foreground);
    font-family: var(--vscode-font-family);
    font-weight: var(--vscode-font-weight);
}

button,
button:disabled {
    background-color: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    border: none;
    border-radius: 0;
}
button:focus,
button:hover,
button:hover:disabled,
button:active {
    border: none !important;
    background-color: var(--vscode-button-hoverBackground) !important;
    box-shadow: none !important;
}

.container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: var(--vscode-settings-checkboxBackground);
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
    background-color: var(--vscode-settings-checkboxBackground);
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
    background-color: var(--vscode-settings-checkboxForeground);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
    display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
    left: 7px;
    top: 4px;
    width: 5px;
    height: 10px;
    border: solid var(--vscode-settings-checkboxBorder);
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

input:invalid,
textarea:invalid,
select:invalid {
    background-color: var(--vscode-inputValidation-errorBackground);
    border-color: rgb(200, 200, 200);
}
</style>
