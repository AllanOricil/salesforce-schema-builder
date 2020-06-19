<template>
    <form class=" mx-2" ref="sObjectForm">
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
                    @keyup="checkValidity"
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
                    @keyup="checkValidity"
                />
            </div>
            <div class="form-group col-12">
                <label for="sObjecctGender">Gender</label>
                <select
                    class="form-control"
                    id="sObjecctGender"
                    required
                    v-model="sObjectDefinition.gender"
                    @change="checkValidity"
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
                    @keyup="checkValidity"
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
                    @keyup="checkValidity"
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
                    @keyup="checkValidity"
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
                    @change="checkValidity"
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
                    @keyup="checkValidity"
                />
                <small id="passwordHelpBlock" class="form-text text-muted"
                    >Example: A-{0000}</small
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
                    @keyup="checkValidity"
                />
            </div>
            <div class="form-group col-12">
                <label
                    class="form-check-label custom-checkbox-container"
                    for="sObjectAllowReports"
                >
                    Allow Reports
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="sObjectAllowReports"
                        v-model="sObjectDefinition.enableReports"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="form-group col-12">
                <label
                    class="form-check-label custom-checkbox-container"
                    for="sObjectAllowActivities"
                >
                    Allow Activities
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="sObjectAllowActivities"
                        v-model="sObjectDefinition.enableActivities"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="form-group col-12">
                <label
                    class="form-check-label custom-checkbox-container"
                    for="sObjectTrackFieldHistory"
                >
                    Track Field History
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="sObjectTrackFieldHistory"
                        v-model="sObjectDefinition.enableHistory"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="form-group col-12">
                <label
                    class="form-check-label custom-checkbox-container"
                    for="sObjectAllowInChatterGroups"
                >
                    Allow in Chatter Groups
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="sObjectAllowInChatterGroups"
                        v-model="sObjectDefinition.allowInChatterGroups"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="form-group col-12">
                <label
                    class="form-check-label custom-checkbox-container"
                    for="sObjectAllowSharing"
                >
                    Allow Sharing
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="sObjectAllowSharing"
                        v-model="sObjectDefinition.enableSharing"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="form-group col-12">
                <label
                    class="form-check-label custom-checkbox-container"
                    for="sObjectAllowBulkApiAccess"
                >
                    Allow Bulk API Access
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="sObjectAllowBulkApiAccess"
                        v-model="sObjectDefinition.enableBulkApi"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="form-group col-12">
                <label
                    class="form-check-label custom-checkbox-container"
                    for="sObjectAllowStreamingApiAccess"
                >
                    Allow Streaming API Access
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="sObjectAllowStreamingApiAccess"
                        v-model="sObjectDefinition.enableStreamingApi"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="form-group col-12">
                <label
                    class="form-check-label custom-checkbox-container"
                    for="sObjectAllowSearch"
                >
                    Allow Search
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="sObjectAllowSearch"
                        v-model="sObjectDefinition.enableSearch"
                        @keyup="checkValidity"
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
                    @change="checkValidity"
                >
                    <option value="InDevelopment">In Development</option>
                    <option value="Deployed">Deployed</option>
                </select>
            </div>
        </div>
    </form>
</template>

<script>
import he from "he";
export default {
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
                startingNumber: undefined,
                enableReports: false,
                enableActivities: false,
                enableHistory: false,
                allowInChatterGroups: false,
                enableSharing: false,
                enableBulkApi: false,
                enableStreamingApi: false,
                enableSearch: false,
                deploymentStatus: "Deployed"
            }
        };
    },
    computed: {
        sObjecComputedData() {
            return {
                nameField: {
                    label: this.sObjectDefinition.recordName,
                    displayFormat: this.sObjectDefinition.displayFormat,
                    startingNumber: this.sObjectDefinition.startingNumber,
                    trackHistory: false,
                    type: this.sObjectDefinition.dataType
                },
                label: this.sObjectDefinition.label,
                description: this.sObjectDefinition.description,
                pluralLabel: this.sObjectDefinition.pluralLabel,
                gender: this.sObjectDefinition.gender,
                enableReports: this.sObjectDefinition.enableReports,
                enableActivities: this.sObjectDefinition.enableActivities,
                enableHistory: this.sObjectDefinition.enableHistory,
                allowInChatterGroups: this.sObjectDefinition
                    .allowInChatterGroups,
                enableSharing: this.sObjectDefinition.enableSharing,
                enableBulkApi: this.sObjectDefinition.enableBulkApi,
                enableStreamingApi: this.sObjectDefinition.enableStreamingApi,
                enableSearch: this.sObjectDefinition.enableSearch,
                deploymentStatus: this.sObjectDefinition.deploymentStatus,
                sharingModel: "ReadWrite"
            };
        },
        isValid() {
            return this.$refs.sObjectForm.checkValidity();
        }
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
    methods:{
        checkValidity(){
            return this.$refs.sObjectForm.checkValidity();
        }
    }
};
</script>

<style></style>
