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
                    class="form-check-label custom-checkbox-container"
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
                    class="form-check-label custom-checkbox-container"
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
                    class="form-check-label custom-checkbox-container"
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
                    class="form-check-label custom-checkbox-container"
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
                    class="form-check-label custom-checkbox-container"
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
                    class="form-check-label custom-checkbox-container"
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
                    class="form-check-label custom-checkbox-container"
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
                    class="form-check-label custom-checkbox-container"
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
        </div>
    </form>
</template>

<script>
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
            }
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
    computed: {
        isFormValid() {
            return this.$refs.sObjectForm.checkValidity() !== false;
        }
    }
};
</script>

<style></style>
