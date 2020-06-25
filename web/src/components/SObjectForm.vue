<template>
    <form class="mx-2" id="sObjectForm" ref="sObjectForm">
        <div class="form-row">
            <div class="form-group col-12">
                <label for="sObjectLabel">Label</label>
                <input
                    type="text"
                    class="form-control"
                    id="sObjectLabel"
                    maxlength="40"
                    required
                    v-model="sobject.label"
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
                    v-model="sobject.pluralLabel"
                    @keyup="checkValidity"
                />
            </div>
            <div class="form-group col-12">
                <label for="sObjecctGender">Gender</label>
                <select
                    class="form-control"
                    id="sObjecctGender"
                    required
                    v-model="sobject.gender"
                    @change="checkValidity"
                >
                    <option value="Feminine">Feminine</option>
                    <option value="Masculine">Masculine</option>
                </select>
            </div>
            <div class="form-group col-12">
                <label for="sObjectDescription">Description</label>
                <textarea
                    class="form-control"
                    id="sObjectDescription"
                    rows="3"
                    maxlength="999"
                    v-model="sobject.description"
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
                    v-model="objectName"
                    @keyup="checkValidity"
                />
                <small
                    v-if="sobject.objectName"
                    class="form-text text-muted text-truncate"
                    >API Name: {{ sobject.objectName + '__c' }}</small
                >
            </div>
            <div class="form-group col-12">
                <label for="sObjectRecordName">Record Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="sObjectRecordName"
                    maxlength="80"
                    required
                    v-model="sobject.recordName"
                    @keyup="checkValidity"
                />
                <small class="form-text text-muted">
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
                    v-model="sobject.dataType"
                    @change="checkValidity"
                >
                    <option value="Text">Text</option>
                    <option value="AutoNumber">Auto Number</option>
                </select>
            </div>
            <div
                v-if="sobject.dataType === 'AutoNumber'"
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
                    v-model="sobject.displayFormat"
                    @keyup="checkValidity"
                />
                <small id="passwordHelpBlock" class="form-text text-muted"
                    >Example: A-{0000}</small
                >
            </div>
            <div
                v-if="sobject.dataType === 'AutoNumber'"
                class="form-group col-12"
            >
                <label for="Starting Number">Starting Number</label>
                <input
                    type="number"
                    class="form-control"
                    id="Starting Number"
                    min="0"
                    required
                    v-model="sobject.startingNumber"
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
                        v-model="sobject.enableReports"
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
                        v-model="sobject.enableActivities"
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
                        v-model="sobject.enableHistory"
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
                        v-model="sobject.allowInChatterGroups"
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
                        v-model="sobject.enableSharing"
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
                        v-model="sobject.enableBulkApi"
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
                        v-model="sobject.enableStreamingApi"
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
                        v-model="sobject.enableSearch"
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
                    v-model="sobject.deploymentStatus"
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
import he from 'he';
export default {
    data() {
        return {
            sobject: {
                name: undefined,
                label: undefined,
                objectName: undefined,
                description: undefined,
                pluralLabel: undefined,
                gender: 'Feminine',
                recordName: undefined,
                dataType: 'Text',
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
                deploymentStatus: 'Deployed',
            },
            objectName: undefined,
        };
    },
    computed: {
        sObjecComputedData() {
            return {
                nameField: {
                    label: this.sobject.recordName,
                    displayFormat: this.sobject.displayFormat,
                    startingNumber: this.sobject.startingNumber,
                    trackHistory: false,
                    type: this.sobject.dataType,
                },
                label: this.sobject.label,
                description: this.sobject.description,
                pluralLabel: this.sobject.pluralLabel,
                gender: this.sobject.gender,
                enableReports: this.sobject.enableReports,
                enableActivities: this.sobject.enableActivities,
                enableHistory: this.sobject.enableHistory,
                allowInChatterGroups: this.sobject.allowInChatterGroups,
                enableSharing: this.sobject.enableSharing,
                enableBulkApi: this.sobject.enableBulkApi,
                enableStreamingApi: this.sobject.enableStreamingApi,
                enableSearch: this.sobject.enableSearch,
                deploymentStatus: this.sobject.deploymentStatus,
                sharingModel: 'ReadWrite',
            };
        },
        isValid() {
            return this.$refs.sObjectForm.checkValidity();
        },
    },
    watch: {
        'sobject.label'(newValue, oldValue) {
            this.sobject.objectName = this.sobject.label.replace(/\s/g, '_');
            this.sobject.name = this.sobject.label;
            this.sobject.recordName = this.sobject.label + ' Name';
        },
        'sobject.enableSharing'(newValue, oldValue) {
            this.sobject.enableBulkApi = newValue === true;
            this.sobject.enableStreamingApi = newValue === true;
        },
        'sobject.enableStreamingApi'(newValue, oldValue) {
            this.sobject.enableSharing = newValue === true;
            this.sobject.enableBulkApi = newValue === true;
        },
        'sobject.enableBulkApi'(newValue, oldValue) {
            this.sobject.enableSharing = newValue === true;
            this.sobject.enableStreamingApi = newValue === true;
        },
        objectName(newValue) {
            newValue = newValue.replace(/\s/g, '_');
            this.objectName = newValue;
            this.sobject.objectName = this.objectName;
        },
    },
    methods: {
        checkValidity() {
            return this.$refs.sObjectForm.checkValidity();
        },
    },
};
</script>

<style></style>
