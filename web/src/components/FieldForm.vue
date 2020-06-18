<template>
    <form class="mx-2 mb-5" ref="fieldForm">
        <div class="form-row">
            <div class="form-group col-12">
                <label for="fieldType">Type</label>
                <select
                    class="form-control"
                    id="fieldType"
                    v-model="field.type"
                    required
                    @change="checkValidity"
                >
                    <option
                        v-for="(type, index) in types"
                        :key="index"
                        :value="type.value"
                        >{{ type.name }}</option
                    >
                </select>
            </div>
            <div v-if="field.type === 'Formula'" class="form-group col-12">
                <label for="fieldFormulaType">Formula Type</label>
                <select
                    class="form-control"
                    id="fieldFormulaType"
                    v-model="field.formulaType"
                    required
                    @change="checkValidity"
                >
                    <option value="Chekbox">Checkbox</option>
                    <option value="Currency">Currency</option>
                    <option value="Date">Date</option>
                    <option value="DateTime">Date/Time</option>
                    <option value="Number">Number</option>
                    <option value="Percent">Percent</option>
                    <option value="Text">Text</option>
                    <option value="Time">Time</option>
                </select>
            </div>
            <div
                v-if="field.type === 'Lookup' || field.type === 'MasterDetail'"
                class="form-group col-12"
            >
                <label for="fieldRelatedTo">Related To</label>
                <select
                    class="form-control"
                    id="fieldRelatedTo"
                    v-model="field.referenceTo"
                    required
                    @change="checkValidity"
                >
                    <option
                        v-for="(object, index) in referenceAbleObjects"
                        :key="index"
                        :value="object"
                        >{{ object }}</option
                    >
                </select>
            </div>
            <div
                v-if="
                    field.formulaType === 'Number' ||
                        field.formulaType === 'Currency' ||
                        field.formulaType === 'Percent'
                "
                class="form-group col-12"
            >
                <label for="fieldFormulaPrecision">Precision</label>
                <input
                    type="number"
                    class="form-control"
                    id="fieldFormulaPrecision"
                    min="0"
                    max="18"
                    required
                    v-model="field.scale"
                    @keyup="checkValidity"
                />
            </div>
            <div class="form-group col-12">
                <label for="fieldLabel">Field Label</label>
                <input
                    type="text"
                    class="form-control"
                    id="fieldLabel"
                    maxlength="40"
                    required
                    v-model="field.label"
                    @keyup="checkValidity"
                />
            </div>
            <div class="form-group col-12">
                <label for="fieldName">Field Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="fieldName"
                    maxlength="40"
                    required
                    pattern="^(?!.*__)(?!.*_$)[A-Za-z]\w*$"
                    v-model="fieldName"
                    @keyup="checkValidity"
                />
                <small>API Name: {{ field.fullName }}</small>
            </div>
            <div
                v-if="
                    field.type === 'Text' ||
                        field.type === 'LongTextArea' ||
                        field.type === 'Html' ||
                        field.type === 'EncryptedText'
                "
                class="form-group col-12"
            >
                <label for="fieldLength">Length</label>
                <input
                    type="number"
                    class="form-control"
                    id="fieldLength"
                    required
                    step="1"
                    :min="
                        field.type === 'Text' || field.type === 'EncryptedText'
                            ? 1
                            : 255
                    "
                    :max="
                        field.type === 'Text'
                            ? 255
                            : field.type === 'EncryptedText'
                            ? 175
                            : 131073
                    "
                    v-model="field.length"
                    @keyup="checkValidity"
                />
            </div>
            <div v-if="field.type === 'AutoNumber'" class="form-group col-12">
                <label for="fieldDisplayFormat">Display Format</label>
                <input
                    type="text"
                    class="form-control"
                    id="fieldDisplayFormat"
                    maxlength="32"
                    pattern=".{0,20}\{[0]{1,10}\}"
                    v-model="field.displayFormat"
                    @keyup="checkValidity"
                />
                <small id="fieldDisplayFormatHelp" class="form-text text-muted"
                    >A-{0000}</small
                >
            </div>
            <div v-if="field.type === 'AutoNumber'" class="form-group col-12">
                <label for="fieldStartingNumber">Starting Number</label>
                <input
                    type="number"
                    class="form-control"
                    id="fieldStartingNumber"
                    required
                    min="0"
                    v-model="field.startingNumber"
                    @keyup="checkValidity"
                />
            </div>
            <div
                v-if="
                    field.type !== 'Checkbox' &&
                        field.type !== 'Phone' &&
                        field.type !== 'Picklist' &&
                        field.type !== 'MultiselectPicklist'
                "
                class="form-group col-12"
            >
                <label for="fieldDefaultValue">Default Value</label>
                <textarea
                    class="form-control"
                    id="fieldDefaultValue"
                    rows="2"
                    v-model="defaultValue"
                    @keyup="checkValidity"
                ></textarea>
            </div>
            <div v-if="field.type === 'Checkbox'" class="form-group col-12">
                <label for="fieldDefaultValue">Default Value</label>
                <select
                    class="form-control"
                    id="fieldDefaultValue"
                    v-model="field.defaultValue"
                    required
                    @change="checkValidity"
                >
                    <option :value="true">Checked</option>
                    <option :value="false">Unchecked</option>
                </select>
            </div>
            <div
                v-if="
                    field.type === 'Currency' ||
                        field.type === 'Number' ||
                        field.type === 'Percent'
                "
                class="form-group col-6 pr-2"
            >
                <label for="fieldLength">Length</label>
                <input
                    type="number"
                    class="form-control"
                    id="fieldLength"
                    min="1"
                    :max="18 - field.scale"
                    v-model="field.precision"
                    @keyup="checkValidity"
                />
            </div>
            <div
                v-if="
                    field.type === 'Currency' ||
                        field.type === 'Number' ||
                        field.type === 'Percent' ||
                        field.type === 'Location'
                "
                :class="[
                    'form-group',
                    field.type === 'Location' ? 'col-12' : 'pl-2 col-6'
                ]"
            >
                <label for="fieldPrecision">Decimal Places</label>
                <input
                    type="number"
                    class="form-control"
                    id="fieldPrecision"
                    min="0"
                    :max="field.type === 'Location' ? 16 : 18 - field.precision"
                    v-model="field.scale"
                    @keyup="checkValidity"
                />
            </div>
            <div v-if="field.type === 'Location'" class="form-group col-12">
                <label for="fieldDisplayLocationInDecimal"
                    >Latitude and Longitude Display Notation</label
                >
                <select
                    class="form-control"
                    id="fieldDisplayLocationInDecimal"
                    v-model="field.displayLocationInDecimal"
                    required
                    @change="checkValidity"
                >
                    <option :value="true">Degrees, Minutes, Seconds</option>
                    <option :value="false">Decimal</option>
                </select>
            </div>
            <div
                v-if="
                    field.type === 'Picklist' ||
                        field.type === 'MultiselectPicklist'
                "
                class="form-group col-12"
            >
                <label for="useGlobalPicklistValueSet">Values</label>
                <select
                    class="form-control"
                    id="useGlobalPicklistValueSet"
                    v-model="useGlobalPicklistValueSet"
                    required
                    @change="checkValidity"
                >
                    <option value="1">Use global picklist value set</option>
                    <option value="2"
                        >Enter values, with each value separated by a new
                        line</option
                    >
                </select>
            </div>
            <div
                v-if="
                    (field.type === 'MultiselectPicklist' ||
                        field.type === 'Picklist') &&
                        useGlobalPicklistValueSet &&
                        useGlobalPicklistValueSet == '1'
                "
                class="form-group col-12"
            >
                <label for="fieldValueSetValueSetName">Global Picklist</label>
                <select
                    class="form-control"
                    id="fieldValueSetValueSetName"
                    v-model="valueSet.valueSetName"
                    required
                    @change="checkValidity"
                >
                    <option
                        v-for="(globalValueSet, index) in globalValueSets"
                        :key="index"
                        >{{ globalValueSet.fullName }}</option
                    >
                </select>
            </div>
            <div
                v-if="
                    (field.type === 'MultiselectPicklist' ||
                        field.type === 'Picklist') &&
                        useGlobalPicklistValueSet &&
                        useGlobalPicklistValueSet == '2'
                "
                class="form-group col-12"
            >
                <textarea
                    class="form-control"
                    id="fieldValueSetValueSetDefinitionValues"
                    rows="3"
                    required
                    v-model="valueSet.valueSetDefinition.value"
                    @keyup="checkValidity"
                ></textarea>
            </div>
            <div
                v-if="
                    (field.type === 'MultiselectPicklist' ||
                        field.type === 'Picklist') &&
                        useGlobalPicklistValueSet &&
                        useGlobalPicklistValueSet == '2'
                "
                class="form-group col-12"
            >
                <label
                    class="form-check-label custom-checkbox-container"
                    for="fieldValueSetValueSetDefinitionSorted"
                >
                    Display values alphabetically, not in the order entered
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="fieldValueSetValueSetDefinitionSorted"
                        v-model="valueSet.valueSetDefinition.sorted"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div
                v-if="
                    (field.type === 'MultiselectPicklist' ||
                        field.type === 'Picklist') &&
                        useGlobalPicklistValueSet &&
                        useGlobalPicklistValueSet == '2'
                "
                class="form-group col-12"
            >
                <label
                    class="form-check-label custom-checkbox-container"
                    for="picklistMakeFirstValueDefault"
                >
                    Use first value as default value
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="picklistMakeFirstValueDefault"
                        v-model="valueSet.makeFirstValueDefault"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div
                v-if="
                    (field.type === 'MultiselectPicklist' ||
                        field.type === 'Picklist') &&
                        useGlobalPicklistValueSet &&
                        useGlobalPicklistValueSet == '2'
                "
                class="form-group col-12"
            >
                <label
                    class="form-check-label custom-checkbox-container"
                    for="fieldValueSetRestricted"
                >
                    Restrict picklist to the values defined in the value set
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="fieldValueSetRestricted"
                        v-model="valueSet.restricted"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div
                v-if="
                    field.type === 'MultiselectPicklist' ||
                        field.type === 'LongTextArea' ||
                        field.type === 'Html'
                "
                class="form-group col-12"
            >
                <label for="fieldName"># Visible Lines</label>
                <input
                    type="number"
                    class="form-control"
                    id="fieldName"
                    required
                    maxlength="2"
                    step="1"
                    min="3"
                    max="10"
                    v-model="field.visibleLines"
                    @keyup="checkValidity"
                />
            </div>
            <div class="form-group col-12">
                <label for="fieldDescription">Description</label>
                <textarea
                    class="form-control"
                    id="fieldDescription"
                    rows="2"
                    v-model="field.description"
                    @keyup="checkValidity"
                ></textarea>
            </div>
            <div class="form-group col-12">
                <label for="fieldinlineHelpText">Help Text</label>
                <textarea
                    class="form-control"
                    id="fieldinlineHelpText"
                    rows="2"
                    v-model="field.inlineHelpText"
                    @keyup="checkValidity"
                ></textarea>
            </div>
            <div
                v-if="
                    field.type !== 'Checkbox' &&
                        field.type !== 'LongTextArea' &&
                        field.type !== 'Html' &&
                        field.type !== 'AutoNumber' &&
                        field.type !== 'Formula'
                "
                class="form-group col-12"
            >
                <label
                    class="form-check-label custom-checkbox-container"
                    for="fieldRequired"
                >
                    Required
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="fieldRequired"
                        v-model="field.required"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div
                v-if="
                    field.type === 'Email' ||
                        field.type === 'Number' ||
                        field.type === 'Text'
                "
                class="form-group col-12"
            >
                <label
                    class="form-check-label custom-checkbox-container"
                    for="fieldUnique"
                >
                    Unique
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="fieldUnique"
                        v-model="field.unique"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div
                v-if="field.type === 'Text' && field.unique"
                class="form-group col-12"
            >
                <label
                    class="form-check-label custom-checkbox-container"
                    for="fieldCaseSensitive"
                >
                    Case Sensitive ?
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="fieldCaseSensitive"
                        v-model="field.caseSensitive"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div
                v-if="
                    field.type === 'Email' ||
                        field.type === 'Number' ||
                        field.type === 'Text' ||
                        field.type === 'AutoNumber'
                "
                class="form-group col-12"
            >
                <label
                    class="form-check-label custom-checkbox-container"
                    for="fieldExternalId"
                >
                    External Id
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="fieldExternalId"
                        v-model="field.externalId"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div
                v-if="field.type === 'EncryptedText'"
                class="form-group col-12"
            >
                <label for="fieldMaskType">Mask Type</label>
                <select
                    class="form-control"
                    id="fieldMaskType"
                    v-model="field.maskType"
                    required
                    @change="checkValidity"
                >
                    <option value="all">Mask All Characters</option>
                    <option value="creditCard">Credit Card Number</option>
                    <option value="ssn">Social Security Number</option>
                    <option value="lastFour">Last Four Characters Clear</option>
                    <option value="sin">Social Insurance Number</option>
                    <option value="nino">National Insurance Number</option>
                </select>
            </div>
            <div
                v-if="field.type === 'EncryptedText'"
                class="form-group col-12"
            >
                <label for="fieldMaskCharacter">Mask Character</label>
                <select
                    class="form-control"
                    id="fieldMaskCharacter"
                    v-model="field.maskChar"
                    required
                    @change="checkValidity"
                >
                    <option value="asterisk">*</option>
                    <option value="X">X</option>
                </select>
            </div>
            <div v-if="field.type === 'Formula'" class="form-group col-12">
                <label
                    class="form-check-label custom-checkbox-container"
                    for="fieldTreatBlanksAs"
                >
                    Treat blank fields as zeroes?
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="fieldTreatBlanksAs"
                        v-model="field.formulaTreatBlanksAs"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
        </div>
    </form>
</template>

<script>
import he from "he";
import { type } from "os";
export default {
    props: {
        editingField: Object
    },
    beforeMount() {
        this.getAvailableGlobalValueSets();
        this.getAvailableObjects();
        window.addEventListener("message", event => {
            const message = event.data;
            if (message.name === "globalValueSets") {
                this.globalValueSets = message.data.result;
                console.log(this.globalValueSets);
            }

            if (message.name === "objects") {
                this.objects = message.data.result;
                console.log(this.objects);
            }
        });
    },
    computed: {
        standardObjects() {
            return this.objects.filter(object => {
                return !(
                    /^\w*__x\b$/g.test(object) || /^\w*__c\b$/g.test(object)
                );
            });
        },
        shareObjets() {
            return this.objects.filter(object => /^\w*Share\b$/g.test(object));
        },
        referenceAbleObjects() {
            return this.objects.filter(object => {
                return (
                    /^\w*__c\b$/g.test(object) ||
                    !(
                        /^\w*__c\b$/g.test(object) ||
                        /^\w*__x\b$/g.test(object) ||
                        /^\w*Share\b$/g.test(object) ||
                        /^\w*History\b$/.test(object) ||
                        /^\w*ChangeEvent\b$/g.test(object) ||
                        ![
                            "Account",
                            "Address",
                            "Asset",
                            "AssignedResource",
                            "AssociatedLocation",
                            "AuthorizationForm",
                            "AuthorizationFormConsent",
                            "AuthorizationFormDataUse",
                            "AuthorizationFormText",
                            "BackgroundOperation",
                            "BusinessHours",
                            "CalendarModel",
                            "Campaign",
                            "ChannelProgram",
                            "ChannelProgramLevel",
                            "ChannelProgramMember",
                            "WorkCoaching",
                            "CommSubscription",
                            "CommSubscriptionChannelType",
                            "CommSubscriptionConsent",
                            "CommSubscriptionTiming",
                            "ConsumptionRate",
                            "ConsumptionSchedule",
                            "Contact",
                            "ContactPointConsent",
                            "ContactPointEmail",
                            "ContactPointPhone",
                            "ContactPointTypeConsent",
                            "ContentFolder",
                            "Contract",
                            "DandBCompany",
                            "DataUseLegalBasis",
                            "DataUsePurpose",
                            "EngagementChannelType",
                            "Product2",
                            "WorkFeedbackQuestion",
                            "WorkFeedbackQuestionSet",
                            "WorkFeedbackRequest",
                            "Goal",
                            "GoalLink",
                            "Idea",
                            "Individual",
                            "JobProfile",
                            "Lead",
                            "Location",
                            "Macro",
                            "MaintenanceAsset",
                            "MaintenancePlan",
                            "Case",
                            "Metric",
                            "MetricDataLink",
                            "OperatingHours",
                            "Opportunity",
                            "Order",
                            "OrderItem",
                            "OrgMetric",
                            "OrgMetricScanSummary",
                            "PartnerFundAllocation",
                            "PartnerFundClaim",
                            "PartnerFundRequest",
                            "PartnerMarketingBudget",
                            "PartyConsent",
                            "WorkPerformanceCycle",
                            "Pricebook2",
                            "ProductConsumed",
                            "ProductConsumptionSchedule",
                            "ProductItem",
                            "ProductRequest",
                            "ProductRequestLineItem",
                            "ProductRequired",
                            "ProductTransfer",
                            "QuickText",
                            "Quote",
                            "QuoteLineItem",
                            "Recommendation",
                            "ResourceAbsence",
                            "ServiceResourceCapacity",
                            "ReturnOrder",
                            "ReturnOrderLineItem",
                            "ServiceAppointment",
                            "ServiceCrew",
                            "ServiceCrewMember",
                            "ServiceResource",
                            "ServiceTerritory",
                            "Shift",
                            "Shipment",
                            "SocialPersona",
                            "Solution",
                            "TimeSheet",
                            "TimeSheetEntry",
                            "TimeSlot",
                            "User",
                            "UserProvAccount",
                            "UserProvisioningLog",
                            "UserProvisioningRequest",
                            "WorkOrder",
                            "WorkOrderLineItem",
                            "WorkType",
                            "WorkTypeGroup",
                            "WorkTypeGroupMember",
                            "Community"
                        ].includes(object)
                    )
                );
            });
        },
        changeEventObjets() {
            return this.objects.filter(object =>
                /^\w*ChangeEvent\b$/g.test(object)
            );
        },
        historyObjects() {
            return this.objects.filter(object => /^\w*History\b$/.test(object));
        },
        customObjects() {
            return this.objects.filter(object => /^\w*__c\b$/g.test(object));
        },
        externalObjects() {
            return this.objects.filter(object => /^\w*__x\b$/g.test(object));
        }
    },
    watch: {
        "field.type"(newValue) {
            if (
                this.field.type !== "Lookup" &&
                this.field.type !== "MasterDetail"
            ) {
                this.field.referenceTo = undefined;
                this.field.referenceTo = undefined;
                this.field.relationshipLabel = undefined;
                this.field.relationshipName = undefined;
                this.field.deleteConstraint = undefined;
                this.field.reparentableMasterDetail = undefined;
                this.field.writeRequiresMasterRead = undefined;
                this.field.relationshipOrder = undefined;
            }

            if (this.field.type !== "Formula") {
                this.field.formulaType = undefined;
                this.field.formulaTreatBlanksAs = undefined;
            }

            if (
                this.field.type !== "Picklist" &&
                this.field.type !== "MultiselectPicklist"
            ) {
                this.field.valueSet = undefined;
                this.valueSet = {
                    valueSetName: undefined,
                    restricted: undefined,
                    valueSetDefinition: {
                        sorted: undefined,
                        values: undefined
                    },
                    makeFirstValueDefault: false
                };
                this.useGlobalPicklistValueSet = undefined;
            }

            if (this.field.type !== "MultiselectPicklist") {
                this.field.visibleLines = undefined;
            }

            if (
                this.field.type === "Picklist" ||
                this.field.type === "MultiselectPicklist" ||
                this.field.type === "Phone"
            ) {
                this.field.defaultValue = undefined;
            }

            if (this.field.type === "AutoNumber") {
                this.field.required = undefined;
                this.field.unique = undefined;
                this.field.trackHistory = undefined;
            } else {
                this.field.displayFormat = undefined;
                this.field.startingNumber = undefined;
            }

            if (
                newValue === "Currency" ||
                newValue === "Number" ||
                newValue === "Percent"
            ) {
                this.field.scale =
                    typeof this.field.scale === "undefined"
                        ? 0
                        : this.field.scale;
                this.field.precision =
                    typeof this.field.precision === "undefined"
                        ? 18
                        : this.field.precision;
            }

            if (newValue === "Location") {
                this.field.scale =
                    typeof this.field.scale === "undefined"
                        ? 0
                        : this.field.scale;
                this.field.displayLocationInDecimal =
                    typeof this.field.displayLocationInDecimal === "undefined"
                        ? true
                        : this.field.displayLocationInDecimal;
            }

            if (newValue === "MultiselectPicklist") {
                this.field.visibleLines =
                    typeof this.field.visibleLines === "undefined"
                        ? 4
                        : this.field.visibleLines;
            }

            if (newValue === "LongTextArea" || newValue === "Html") {
                this.field.length =
                    typeof this.field.length === "undefined"
                        ? 32768
                        : this.field.length;
                this.field.visibleLines =
                    typeof this.field.visibleLines === "undefined"
                        ? 3
                        : this.field.visibleLines;
            }
            if (newValue === "Text" || newValue === "EncryptedText") {
                this.field.length =
                    typeof this.field.length === "undefined"
                        ? 1
                        : this.field.length;
            }

            if (newValue === "EncryptedText") {
                this.field.maskChar =
                    typeof this.field.maskChar === "undefined"
                        ? "asterisk"
                        : this.field.maskChar;
                this.field.maskType =
                    typeof this.field.maskType === "undefined"
                        ? "all"
                        : this.field.maskType;
            }

            this.checkValidity();
        },
        "field.label"(newValue) {
            if (newValue && typeof this.fieldName === "undefined") {
                this.fieldName = newValue.replace(/\s/g, "_");
            }
        },
        fieldName(newValue) {
            newValue = newValue.replace(/\s/g, "_");
            this.fieldName = newValue;
            if (newValue) {
                this.field.fullName = newValue + "__c";
            } else {
                this.field.fullName = undefined;
            }
        },
        "valueSet.valueSetDefinition.value"(newValue) {
            this.valueSet.valueSetDefinition.value = newValue
                ? newValue.replace(/^(?:[\t ]*(?:\r?\n|\r))+/gm, "")
                : undefined;
        },
        defaultValue() {
            if (typeof this.defaultValue !== "undefined")
                this.field.defaultValue = he.escape(this.defaultValue);
        },
        editingField(newValue) {
            this.field = newValue;
            if (!this.field.fullName)
                this.fieldName = this.field.label.replace(/\s/g, "_");
            else this.fieldName = this.field.fullName.replace("__c", "");
            this.$nextTick(function() {
                if (typeof this.field.defaultValue !== "undefined")
                    this.defaultValue = he.unescape(
                        he.decode(String(this.field.defaultValue))
                    );
                else this.defaultValue = undefined;

                if (typeof this.field.valueSet !== "undefined") {
                    this.valueSet = this.field.valueSet;
                    if (this.valueSet.valueSetDefinition.value) {
                        this.useGlobalPicklistValueSet = 2;
                    } else {
                        this.useGlobalPicklistValueSet = 1;
                        this.valueSet.valueSetDefinition.sorted = undefined;
                        this.valueSet.valueSetDefinition.value = undefined;
                        this.valueSet.makeFirstValueDefault = undefined;
                        this.valueSet.restricted = undefined;
                    }
                }
            });

            this.checkValidity();
        },
        useGlobalPicklistValueSet(newValue) {
            if (newValue == 1) {
                this.valueSet.valueSetDefinition.sorted = undefined;
                this.valueSet.valueSetDefinition.value = undefined;
                this.valueSet.makeFirstValueDefault = undefined;
                this.valueSet.restricted = undefined;
            } else {
                this.valueSet.valueSetName = undefined;
            }
        },
        "field.unique"(newValue) {
            if (typeof this.field.caseSensitive !== "undefined")
                this.field.caseSensitive = undefined;
        },
        "field.formulaType"(newValue) {
            if (
                newValue === "Number" ||
                newValue === "Percent" ||
                newValue === "Currency"
            ) {
                this.field.precision = 18;
            } else {
                this.field.precision = undefined;
                this.field.scale = undefined;
            }
        },
        valueSet: {
            deep: true,
            handler(newValue) {
                this.field.valueSet = JSON.parse(JSON.stringify(newValue));

                delete this.field.valueSet.makeFirstValueDefault;
                if (
                    newValue.valueSetDefinition &&
                    newValue.valueSetDefinition.value
                ) {
                    let values = newValue.valueSetDefinition.value
                        .split("\n")
                        .map((value, index) => {
                            return {
                                fullName: value,
                                label: value,
                                default:
                                    index === 0 &&
                                    newValue.makeFirstValueDefault
                            };
                        });

                    this.field.valueSet.valueSetDefinition.value = values;
                }
                delete this.field.valueSet.makeFirstValueDefault;
            }
        }
    },
    data() {
        return {
            field: {
                fullName: undefined,
                externalId: undefined,
                label: undefined,
                description: undefined,
                inlineHelpText: undefined,
                trackHistory: false,
                trackTrending: false,
                type: "Checkbox",
                required: false,
                unique: false,
                defaultValue: undefined,
                precision: undefined,
                scale: undefined,
                caseSensitive: undefined,
                displayLocationInDecimal: undefined,
                valueSet: undefined,
                referenceTo: undefined,
                relationshipLabel: undefined,
                relationshipName: undefined,
                deleteConstraint: undefined,
                reparentableMasterDetail: undefined,
                writeRequiresMasterRead: undefined,
                relationshipOrder: undefined,
                displayFormat: undefined,
                startingNumber: undefined,
                formulaTreatBlanksAs: undefined,
                visibleLines: undefined,
                length: undefined,
                maskChar: undefined,
                maskType: undefined,
                formulaType: undefined
            },
            valueSet: {
                valueSetName: undefined,
                restricted: undefined,
                valueSetDefinition: {
                    sorted: undefined,
                    value: undefined
                },
                makeFirstValueDefault: false
            },
            fieldName: undefined,
            defaultValue: undefined,
            useGlobalPicklistValueSet: 1,
            types: [
                { name: "Auto Number", value: "AutoNumber" },
                { name: "Formula", value: "Formula" },
                { name: "Lookup", value: "Lookup" },
                { name: "Master Detail", value: "MasterDetail" },
                { name: "Checkbox", value: "Checkbox" },
                { name: "Currency", value: "Currency" },
                { name: "Date", value: "Date" },
                { name: "DateTime", value: "DateTime" },
                { name: "Email", value: "Email" },
                { name: "Geolocation", value: "Location" },
                { name: "Number", value: "Number" },
                { name: "Percent", value: "Percent" },
                { name: "Phone", value: "Phone" },
                { name: "Picklist", value: "Picklist" },
                {
                    name: "Picklist (Multi-Select)",
                    value: "MultiselectPicklist"
                },
                { name: "Text", value: "Text" },
                { name: "Text Area", value: "TextArea" },
                { name: "Text Area (Long)", value: "LongTextArea" },
                { name: "Text Area (Rich)", value: "Html" },
                { name: "Text (Encrypted)", value: "EncryptedText" },
                { name: "Time", value: "Time" },
                { name: "URL", value: "Url" }
            ],
            globalValueSets: [
                {
                    fullName: "teste"
                }
            ],
            objects: [
                "aHistory__c",
                "Book__c",
                "Broker__c",
                "Camping_Item__c",
                "Campsite_Reservation__c",
                "Campsite__c",
                "Candidate__c",
                "Cat__c",
                "DB__c",
                "E__c",
                "EinsteinAI_Settings__c",
                "Energy_Audit__c",
                "Expense__c",
                "Favorite__c",
                "Feedback__c",
                "Fund__c",
                "H__c",
                "Hpe_Plugin_Usage__c",
                "Interested_Person__c",
                "JobPosting__c",
                "Job_Application__c",
                "LeadAssociation__c",
                "New_Custom_Object__c",
                "Phone_Plan__x",
                "Phone__x",
                "Position__c",
                "Product_Statement__c",
                "Property__c",
                "Review__c",
                "Sector__c",
                "ServiceCredentials__c",
                "ServiceTokens__c",
                "Suggestion__c",
                "Test2__c",
                "Test3__c",
                "Test4__c",
                "Test__c",
                "Trail__c",
                "Vehicle__c",
                "Websites__c",
                "Work_Part__c",
                "a__c",
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa__c",
                "b__c",
                "d__c",
                "ltnadptn__Lightning_Adoption_Report_Snapshot__c",
                "sad__c",
                "AcceptedEventRelation",
                "Account",
                "AccountBrand",
                "AccountBrandShare",
                "AccountChangeEvent",
                "AccountCleanInfo",
                "AccountContactRelation",
                "AccountContactRole",
                "AccountContactRoleChangeEvent",
                "AccountFeed",
                "AccountHistory",
                "AccountPartner",
                "AccountShare",
                "AccountUserTerritory2View",
                "ActionLinkGroupTemplate",
                "ActionLinkTemplate",
                "ActiveScratchOrg",
                "ActiveScratchOrgFeed",
                "ActiveScratchOrgHistory",
                "ActiveScratchOrgShare",
                "ActivityHistory",
                "AdditionalNumber",
                "Address",
                "AggregateResult",
                "Announcement",
                "ApexClass",
                "ApexComponent",
                "ApexEmailNotification",
                "ApexLog",
                "ApexPage",
                "ApexPageInfo",
                "ApexTestQueueItem",
                "ApexTestResult",
                "ApexTestResultLimits",
                "ApexTestRunResult",
                "ApexTestSuite",
                "ApexTrigger",
                "ApiEvent",
                "ApiEventStream",
                "AppAnalyticsQueryRequest",
                "AppDefinition",
                "AppExtension",
                "AppMenuItem",
                "AppTabMember",
                "AppleDomainVerification",
                "Asset",
                "AssetChangeEvent",
                "AssetFeed",
                "AssetHistory",
                "AssetRelationship",
                "AssetRelationshipFeed",
                "AssetRelationshipHistory",
                "AssetShare",
                "AssetTokenEvent",
                "AssignedResource",
                "AssignedResourceChangeEvent",
                "AssignedResourceFeed",
                "AssignmentRule",
                "AssociatedLocation",
                "AssociatedLocationHistory",
                "AsyncApexJob",
                "AsyncOperationEvent",
                "AsyncOperationStatus",
                "AttachedContentDocument",
                "Attachment",
                "Audience",
                "AuraDefinition",
                "AuraDefinitionBundle",
                "AuraDefinitionBundleInfo",
                "AuraDefinitionInfo",
                "AuthConfig",
                "AuthConfigProviders",
                "AuthProvider",
                "AuthSession",
                "AuthorizationForm",
                "AuthorizationFormConsent",
                "AuthorizationFormConsentChangeEvent",
                "AuthorizationFormConsentHistory",
                "AuthorizationFormConsentShare",
                "AuthorizationFormDataUse",
                "AuthorizationFormDataUseHistory",
                "AuthorizationFormDataUseShare",
                "AuthorizationFormHistory",
                "AuthorizationFormShare",
                "AuthorizationFormText",
                "AuthorizationFormTextHistory",
                "BackgroundOperation",
                "BatchApexErrorEvent",
                "Book__ChangeEvent",
                "BrandTemplate",
                "BrandingSet",
                "BrandingSetProperty",
                "Broker__ChangeEvent",
                "BusinessHours",
                "BusinessProcess",
                "Calendar",
                "CalendarView",
                "CalendarViewShare",
                "CallCenter",
                "Campaign",
                "CampaignChangeEvent",
                "CampaignFeed",
                "CampaignHistory",
                "CampaignMember",
                "CampaignMemberChangeEvent",
                "CampaignMemberStatus",
                "CampaignMemberStatusChangeEvent",
                "CampaignShare",
                "Camping_Item__ChangeEvent",
                "Campsite_Reservation__ChangeEvent",
                "Campsite__ChangeEvent",
                "Candidate__ChangeEvent",
                "Case",
                "CaseChangeEvent",
                "CaseComment",
                "CaseContactRole",
                "CaseFeed",
                "CaseHistory",
                "CaseShare",
                "CaseSolution",
                "CaseStatus",
                "CaseTeamMember",
                "CaseTeamRole",
                "CaseTeamTemplate",
                "CaseTeamTemplateMember",
                "CaseTeamTemplateRecord",
                "Cat__ChangeEvent",
                "CategoryData",
                "CategoryNode",
                "ChannelProgram",
                "ChannelProgramFeed",
                "ChannelProgramHistory",
                "ChannelProgramLevel",
                "ChannelProgramLevelFeed",
                "ChannelProgramLevelHistory",
                "ChannelProgramLevelShare",
                "ChannelProgramMember",
                "ChannelProgramMemberFeed",
                "ChannelProgramMemberHistory",
                "ChannelProgramMemberShare",
                "ChannelProgramShare",
                "ChatterActivity",
                "ChatterExtension",
                "ChatterExtensionConfig",
                "ClientBrowser",
                "CollaborationGroup",
                "CollaborationGroupFeed",
                "CollaborationGroupMember",
                "CollaborationGroupMemberRequest",
                "CollaborationGroupRecord",
                "CollaborationInvitation",
                "ColorDefinition",
                "CombinedAttachment",
                "CommSubscription",
                "CommSubscriptionChannelType",
                "CommSubscriptionChannelTypeFeed",
                "CommSubscriptionChannelTypeHistory",
                "CommSubscriptionChannelTypeShare",
                "CommSubscriptionConsent",
                "CommSubscriptionConsentFeed",
                "CommSubscriptionConsentHistory",
                "CommSubscriptionConsentShare",
                "CommSubscriptionFeed",
                "CommSubscriptionHistory",
                "CommSubscriptionShare",
                "CommSubscriptionTiming",
                "CommSubscriptionTimingFeed",
                "CommSubscriptionTimingHistory",
                "Community",
                "ConferenceNumber",
                "ConnectedApplication",
                "ConsumptionRate",
                "ConsumptionRateHistory",
                "ConsumptionSchedule",
                "ConsumptionScheduleFeed",
                "ConsumptionScheduleHistory",
                "ConsumptionScheduleShare",
                "Contact",
                "ContactChangeEvent",
                "ContactCleanInfo",
                "ContactFeed",
                "ContactHistory",
                "ContactPointConsent",
                "ContactPointConsentChangeEvent",
                "ContactPointConsentHistory",
                "ContactPointConsentShare",
                "ContactPointEmail",
                "ContactPointEmailChangeEvent",
                "ContactPointEmailHistory",
                "ContactPointEmailShare",
                "ContactPointPhone",
                "ContactPointPhoneChangeEvent",
                "ContactPointPhoneHistory",
                "ContactPointPhoneShare",
                "ContactPointTypeConsent",
                "ContactPointTypeConsentChangeEvent",
                "ContactPointTypeConsentHistory",
                "ContactPointTypeConsentShare",
                "ContactRequest",
                "ContactRequestShare",
                "ContactShare",
                "ContentAsset",
                "ContentBody",
                "ContentDistribution",
                "ContentDistributionView",
                "ContentDocument",
                "ContentDocumentFeed",
                "ContentDocumentHistory",
                "ContentDocumentLink",
                "ContentDocumentSubscription",
                "ContentFolder",
                "ContentFolderItem",
                "ContentFolderLink",
                "ContentFolderMember",
                "ContentNotification",
                "ContentTagSubscription",
                "ContentUserSubscription",
                "ContentVersion",
                "ContentVersionComment",
                "ContentVersionHistory",
                "ContentVersionRating",
                "ContentWorkspace",
                "ContentWorkspaceDoc",
                "ContentWorkspaceMember",
                "ContentWorkspacePermission",
                "ContentWorkspaceSubscription",
                "Contract",
                "ContractChangeEvent",
                "ContractContactRole",
                "ContractFeed",
                "ContractHistory",
                "ContractStatus",
                "CorsWhitelistEntry",
                "CredentialStuffingEvent",
                "CredentialStuffingEventStore",
                "CronJobDetail",
                "CronTrigger",
                "CspTrustedSite",
                "CustomBrand",
                "CustomBrandAsset",
                "CustomHelpMenuItem",
                "CustomHelpMenuSection",
                "CustomHttpHeader",
                "CustomNotificationType",
                "CustomObjectUserLicenseMetrics",
                "CustomPermission",
                "CustomPermissionDependency",
                "DB__ChangeEvent",
                "DB__Share",
                "DandBCompany",
                "Dashboard",
                "DashboardComponent",
                "DashboardComponentFeed",
                "DashboardFeed",
                "DataAssessmentFieldMetric",
                "DataAssessmentMetric",
                "DataAssessmentValueMetric",
                "DataStatistics",
                "DataType",
                "DataUseLegalBasis",
                "DataUseLegalBasisHistory",
                "DataUseLegalBasisShare",
                "DataUsePurpose",
                "DataUsePurposeHistory",
                "DataUsePurposeShare",
                "DatacloudAddress",
                "DatacloudCompany",
                "DatacloudContact",
                "DatacloudDandBCompany",
                "DatacloudOwnedEntity",
                "DatacloudPurchaseUsage",
                "DeclinedEventRelation",
                "DeleteEvent",
                "DigitalSignature",
                "Document",
                "DocumentAttachmentMap",
                "Domain",
                "DomainSite",
                "DuplicateRecordItem",
                "DuplicateRecordSet",
                "DuplicateRule",
                "E__ChangeEvent",
                "E__Share",
                "EinsteinAI_Settings__ChangeEvent",
                "EmailCapture",
                "EmailDomainFilter",
                "EmailDomainKey",
                "EmailMessage",
                "EmailMessageChangeEvent",
                "EmailMessageRelation",
                "EmailRelay",
                "EmailServicesAddress",
                "EmailServicesFunction",
                "EmailStatus",
                "EmailTemplate",
                "EmailTemplateChangeEvent",
                "EmbeddedServiceDetail",
                "EmbeddedServiceLabel",
                "Energy_Audit__ChangeEvent",
                "EngagementChannelType",
                "EngagementChannelTypeFeed",
                "EngagementChannelTypeHistory",
                "EngagementChannelTypeShare",
                "EnhancedLetterhead",
                "EnhancedLetterheadFeed",
                "EntityDefinition",
                "EntityParticle",
                "EntitySubscription",
                "Event",
                "EventBusSubscriber",
                "EventChangeEvent",
                "EventFeed",
                "EventLogFile",
                "EventRelation",
                "EventRelationChangeEvent",
                "Expense__ChangeEvent",
                "ExpressionFilter",
                "ExpressionFilterCriteria",
                "ExternalDataSource",
                "ExternalDataUserAuth",
                "ExternalEvent",
                "ExternalEventMapping",
                "ExternalEventMappingShare",
                "Favorite__ChangeEvent",
                "FeedAttachment",
                "FeedComment",
                "FeedItem",
                "FeedLike",
                "FeedPollChoice",
                "FeedPollVote",
                "FeedRevision",
                "FeedSignal",
                "FeedTrackedChange",
                "Feedback__ChangeEvent",
                "Feedback__History",
                "Feedback__Share",
                "FieldDefinition",
                "FieldPermissions",
                "FieldSecurityClassification",
                "FieldServiceMobileSettings",
                "FileSearchActivity",
                "FiscalYearSettings",
                "FlexQueueItem",
                "FlowDefinitionView",
                "FlowExecutionErrorEvent",
                "FlowInterview",
                "FlowInterviewShare",
                "FlowRecordRelation",
                "FlowStageRelation",
                "FlowVariableView",
                "FlowVersionView",
                "Folder",
                "FolderedContentDocument",
                "ForecastShare",
                "ForecastingAdjustment",
                "ForecastingCategoryMapping",
                "ForecastingDisplayedFamily",
                "ForecastingFact",
                "ForecastingItem",
                "ForecastingOwnerAdjustment",
                "ForecastingQuota",
                "ForecastingShare",
                "ForecastingType",
                "ForecastingTypeToCategory",
                "ForecastingUserPreference",
                "FormulaFunction",
                "FormulaFunctionAllowedType",
                "FormulaFunctionCategory",
                "Fund__ChangeEvent",
                "GrantedByLicense",
                "Group",
                "GroupMember",
                "H__ChangeEvent",
                "H__Share",
                "Holiday",
                "Hpe_Plugin_Usage__ChangeEvent",
                "Hpe_Plugin_Usage__Share",
                "IconDefinition",
                "Idea",
                "IdeaComment",
                "IdentityVerificationEvent",
                "IdpEventLog",
                "IframeWhiteListUrl",
                "Image",
                "ImageShare",
                "Individual",
                "IndividualChangeEvent",
                "IndividualHistory",
                "IndividualShare",
                "InstalledMobileApp",
                "Interested_Person__ChangeEvent",
                "JobPosting__ChangeEvent",
                "JobProfile",
                "JobProfileFeed",
                "JobProfileHistory",
                "JobProfileShare",
                "Job_Application__ChangeEvent",
                "KnowledgeableUser",
                "Lead",
                "LeadAssociation__ChangeEvent",
                "LeadChangeEvent",
                "LeadCleanInfo",
                "LeadFeed",
                "LeadHistory",
                "LeadShare",
                "LeadStatus",
                "LightningExitByPageMetrics",
                "LightningExperienceTheme",
                "LightningOnboardingConfig",
                "LightningToggleMetrics",
                "LightningUriEvent",
                "LightningUriEventStream",
                "LightningUsageByAppTypeMetrics",
                "LightningUsageByBrowserMetrics",
                "LightningUsageByFlexiPageMetrics",
                "LightningUsageByPageMetrics",
                "ListEmail",
                "ListEmailChangeEvent",
                "ListEmailIndividualRecipient",
                "ListEmailRecipientSource",
                "ListEmailShare",
                "ListView",
                "ListViewChart",
                "ListViewChartInstance",
                "ListViewEvent",
                "ListViewEventStream",
                "Location",
                "LocationChangeEvent",
                "LocationFeed",
                "LocationHistory",
                "LocationShare",
                "LoginAsEvent",
                "LoginAsEventStream",
                "LoginEvent",
                "LoginEventStream",
                "LoginGeo",
                "LoginHistory",
                "LoginIp",
                "LogoutEvent",
                "LogoutEventStream",
                "LookedUpFromActivity",
                "Macro",
                "MacroChangeEvent",
                "MacroHistory",
                "MacroInstruction",
                "MacroInstructionChangeEvent",
                "MacroShare",
                "MacroUsage",
                "MacroUsageShare",
                "MailmergeTemplate",
                "MaintenanceAsset",
                "MaintenanceAssetChangeEvent",
                "MaintenanceAssetFeed",
                "MaintenanceAssetHistory",
                "MaintenancePlan",
                "MaintenancePlanChangeEvent",
                "MaintenancePlanFeed",
                "MaintenancePlanHistory",
                "MaintenancePlanShare",
                "MatchingInformation",
                "MatchingRule",
                "MatchingRuleItem",
                "MobileApplicationDetail",
                "MobileSettingsAssignment",
                "MutingPermissionSet",
                "MyDomainDiscoverableLogin",
                "Name",
                "NamedCredential",
                "NamespaceRegistry",
                "NamespaceRegistryFeed",
                "NamespaceRegistryHistory",
                "NavigationLinkSet",
                "NavigationMenuItem",
                "Network",
                "NetworkActivityAudit",
                "NetworkAffinity",
                "NetworkDiscoverableLogin",
                "NetworkMember",
                "NetworkMemberGroup",
                "NetworkModeration",
                "NetworkPageOverride",
                "NetworkSelfRegistration",
                "NetworkUserHistoryRecent",
                "New_Custom_Object__ChangeEvent",
                "New_Custom_Object__History",
                "New_Custom_Object__Share",
                "Note",
                "NoteAndAttachment",
                "OauthCustomScope",
                "OauthToken",
                "ObjectPermissions",
                "ObjectTerritory2AssignmentRule",
                "ObjectTerritory2AssignmentRuleItem",
                "ObjectTerritory2Association",
                "OnboardingMetrics",
                "OpenActivity",
                "OperatingHours",
                "OperatingHoursFeed",
                "Opportunity",
                "OpportunityChangeEvent",
                "OpportunityCompetitor",
                "OpportunityContactRole",
                "OpportunityContactRoleChangeEvent",
                "OpportunityFeed",
                "OpportunityFieldHistory",
                "OpportunityHistory",
                "OpportunityLineItem",
                "OpportunityPartner",
                "OpportunityShare",
                "OpportunityStage",
                "Order",
                "OrderChangeEvent",
                "OrderFeed",
                "OrderHistory",
                "OrderItem",
                "OrderItemChangeEvent",
                "OrderItemFeed",
                "OrderItemHistory",
                "OrderShare",
                "OrderStatus",
                "OrgDeleteRequest",
                "OrgDeleteRequestShare",
                "OrgLifecycleNotification",
                "OrgMetric",
                "OrgMetricScanResult",
                "OrgMetricScanSummary",
                "OrgWideEmailAddress",
                "Organization",
                "OutgoingEmail",
                "OutgoingEmailRelation",
                "OwnedContentDocument",
                "OwnerChangeOptionInfo",
                "PackageLicense",
                "Partner",
                "PartnerFundAllocation",
                "PartnerFundAllocationFeed",
                "PartnerFundAllocationHistory",
                "PartnerFundAllocationShare",
                "PartnerFundClaim",
                "PartnerFundClaimFeed",
                "PartnerFundClaimHistory",
                "PartnerFundClaimShare",
                "PartnerFundRequest",
                "PartnerFundRequestFeed",
                "PartnerFundRequestHistory",
                "PartnerFundRequestShare",
                "PartnerMarketingBudget",
                "PartnerMarketingBudgetFeed",
                "PartnerMarketingBudgetHistory",
                "PartnerMarketingBudgetShare",
                "PartnerRole",
                "PartyConsent",
                "PartyConsentChangeEvent",
                "PartyConsentFeed",
                "PartyConsentHistory",
                "PartyConsentShare",
                "Period",
                "PermissionSet",
                "PermissionSetAssignment",
                "PermissionSetGroup",
                "PermissionSetGroupComponent",
                "PermissionSetLicense",
                "PermissionSetLicenseAssign",
                "PermissionSetTabSetting",
                "PersonalizationTargetInfo",
                "PicklistValueInfo",
                "PlatformAction",
                "PlatformCachePartition",
                "PlatformCachePartitionType",
                "PlatformStatusAlertEvent",
                "PortalDelegablePermissionSet",
                "Position__ChangeEvent",
                "Pricebook2",
                "Pricebook2ChangeEvent",
                "Pricebook2History",
                "PricebookEntry",
                "PricebookEntryHistory",
                "ProcessDefinition",
                "ProcessInstance",
                "ProcessInstanceHistory",
                "ProcessInstanceNode",
                "ProcessInstanceStep",
                "ProcessInstanceWorkitem",
                "ProcessNode",
                "Product2",
                "Product2ChangeEvent",
                "Product2Feed",
                "Product2History",
                "ProductConsumed",
                "ProductConsumedChangeEvent",
                "ProductConsumedFeed",
                "ProductConsumedHistory",
                "ProductConsumptionSchedule",
                "ProductItem",
                "ProductItemChangeEvent",
                "ProductItemFeed",
                "ProductItemHistory",
                "ProductItemShare",
                "ProductItemTransaction",
                "ProductItemTransactionFeed",
                "ProductItemTransactionHistory",
                "ProductRequest",
                "ProductRequestChangeEvent",
                "ProductRequestFeed",
                "ProductRequestHistory",
                "ProductRequestLineItem",
                "ProductRequestLineItemChangeEvent",
                "ProductRequestLineItemFeed",
                "ProductRequestLineItemHistory",
                "ProductRequestShare",
                "ProductRequired",
                "ProductRequiredFeed",
                "ProductRequiredHistory",
                "ProductTransfer",
                "ProductTransferChangeEvent",
                "ProductTransferFeed",
                "ProductTransferHistory",
                "ProductTransferShare",
                "Product_Statement__ChangeEvent",
                "Product_Statement__Share",
                "Profile",
                "Prompt",
                "PromptAction",
                "PromptActionShare",
                "PromptVersion",
                "Property__ChangeEvent",
                "Property__Feed",
                "Property__History",
                "Publisher",
                "PushTopic",
                "QueueSobject",
                "QuickText",
                "QuickTextChangeEvent",
                "QuickTextHistory",
                "QuickTextShare",
                "QuickTextUsage",
                "QuickTextUsageShare",
                "Quote",
                "QuoteChangeEvent",
                "QuoteDocument",
                "QuoteFeed",
                "QuoteLineItem",
                "QuoteLineItemChangeEvent",
                "QuoteShare",
                "QuoteTemplateRichTextData",
                "RecentlyViewed",
                "Recommendation",
                "RecommendationChangeEvent",
                "RecordAction",
                "RecordActionHistory",
                "RecordType",
                "RedirectWhitelistUrl",
                "RelationshipDomain",
                "RelationshipInfo",
                "RemoteKeyCalloutEvent",
                "Report",
                "ReportAnomalyEvent",
                "ReportAnomalyEventStore",
                "ReportEvent",
                "ReportEventStream",
                "ReportFeed",
                "ReputationLevel",
                "ReputationPointsRule",
                "ResourceAbsence",
                "ResourceAbsenceChangeEvent",
                "ResourceAbsenceFeed",
                "ResourceAbsenceHistory",
                "ResourcePreference",
                "ResourcePreferenceFeed",
                "ResourcePreferenceHistory",
                "ReturnOrder",
                "ReturnOrderChangeEvent",
                "ReturnOrderFeed",
                "ReturnOrderHistory",
                "ReturnOrderLineItem",
                "ReturnOrderLineItemChangeEvent",
                "ReturnOrderLineItemFeed",
                "ReturnOrderLineItemHistory",
                "ReturnOrderShare",
                "RevenueElement",
                "Review__ChangeEvent",
                "RuleTerritory2Association",
                "SamlSsoConfig",
                "Scontrol",
                "ScratchOrgInfo",
                "ScratchOrgInfoFeed",
                "ScratchOrgInfoHistory",
                "ScratchOrgInfoShare",
                "SearchLayout",
                "SearchPromotionRule",
                "Sector__ChangeEvent",
                "SecureAgent",
                "SecureAgentPlugin",
                "SecureAgentPluginProperty",
                "SecureAgentsCluster",
                "SecurityCustomBaseline",
                "ServiceAppointment",
                "ServiceAppointmentChangeEvent",
                "ServiceAppointmentFeed",
                "ServiceAppointmentHistory",
                "ServiceAppointmentShare",
                "ServiceAppointmentStatus",
                "ServiceCredentials__ChangeEvent",
                "ServiceCrew",
                "ServiceCrewChangeEvent",
                "ServiceCrewFeed",
                "ServiceCrewHistory",
                "ServiceCrewMember",
                "ServiceCrewMemberChangeEvent",
                "ServiceCrewMemberFeed",
                "ServiceCrewMemberHistory",
                "ServiceCrewShare",
                "ServiceReport",
                "ServiceReportHistory",
                "ServiceReportLayout",
                "ServiceResource",
                "ServiceResourceCapacity",
                "ServiceResourceCapacityFeed",
                "ServiceResourceCapacityHistory",
                "ServiceResourceChangeEvent",
                "ServiceResourceFeed",
                "ServiceResourceHistory",
                "ServiceResourceShare",
                "ServiceResourceSkill",
                "ServiceResourceSkillFeed",
                "ServiceResourceSkillHistory",
                "ServiceTerritory",
                "ServiceTerritoryChangeEvent",
                "ServiceTerritoryFeed",
                "ServiceTerritoryHistory",
                "ServiceTerritoryLocation",
                "ServiceTerritoryLocationFeed",
                "ServiceTerritoryLocationHistory",
                "ServiceTerritoryMember",
                "ServiceTerritoryMemberChangeEvent",
                "ServiceTerritoryMemberFeed",
                "ServiceTerritoryMemberHistory",
                "ServiceTerritoryShare",
                "ServiceTokens__ChangeEvent",
                "SessionHijackingEvent",
                "SessionHijackingEventStore",
                "SessionPermSetActivation",
                "SetupAuditTrail",
                "SetupEntityAccess",
                "Shift",
                "ShiftFeed",
                "ShiftHistory",
                "ShiftShare",
                "ShiftStatus",
                "Shipment",
                "ShipmentChangeEvent",
                "ShipmentFeed",
                "ShipmentHistory",
                "ShipmentShare",
                "Site",
                "SiteDetail",
                "SiteFeed",
                "SiteHistory",
                "SiteIframeWhiteListUrl",
                "Skill",
                "SkillRequirement",
                "SkillRequirementFeed",
                "SkillRequirementHistory",
                "Solution",
                "SolutionFeed",
                "SolutionHistory",
                "SolutionStatus",
                "Stamp",
                "StampAssignment",
                "StaticResource",
                "StreamingChannel",
                "StreamingChannelShare",
                "Suggestion__ChangeEvent",
                "TabDefinition",
                "Task",
                "TaskChangeEvent",
                "TaskFeed",
                "TaskPriority",
                "TaskStatus",
                "TenantUsageEntitlement",
                "Territory2",
                "Territory2Model",
                "Territory2ModelFeed",
                "Territory2ModelHistory",
                "Territory2Type",
                "Test2__ChangeEvent",
                "Test2__History",
                "Test2__Share",
                "Test3__ChangeEvent",
                "Test3__History",
                "Test3__Share",
                "Test4__ChangeEvent",
                "Test4__History",
                "Test4__Share",
                "TestSuiteMembership",
                "Test__ChangeEvent",
                "Test__History",
                "Test__Share",
                "ThirdPartyAccountLink",
                "TimeSheet",
                "TimeSheetChangeEvent",
                "TimeSheetEntry",
                "TimeSheetEntryChangeEvent",
                "TimeSheetEntryFeed",
                "TimeSheetEntryHistory",
                "TimeSheetFeed",
                "TimeSheetHistory",
                "TimeSheetShare",
                "TimeSlot",
                "TodayGoal",
                "TodayGoalShare",
                "Topic",
                "TopicAssignment",
                "TopicFeed",
                "TopicUserEvent",
                "Trail__ChangeEvent",
                "TransactionSecurityPolicy",
                "Translation",
                "UiFormulaCriterion",
                "UiFormulaRule",
                "UndecidedEventRelation",
                "UriEvent",
                "UriEventStream",
                "User",
                "UserAppInfo",
                "UserAppMenuCustomization",
                "UserAppMenuCustomizationShare",
                "UserAppMenuItem",
                "UserChangeEvent",
                "UserCustomBadge",
                "UserEmailPreferredPerson",
                "UserEmailPreferredPersonShare",
                "UserEntityAccess",
                "UserFeed",
                "UserFieldAccess",
                "UserLicense",
                "UserListView",
                "UserListViewCriterion",
                "UserLogin",
                "UserPackageLicense",
                "UserPermissionAccess",
                "UserPreference",
                "UserProvAccount",
                "UserProvAccountStaging",
                "UserProvMockTarget",
                "UserProvisioningConfig",
                "UserProvisioningLog",
                "UserProvisioningRequest",
                "UserProvisioningRequestShare",
                "UserRecordAccess",
                "UserRole",
                "UserSetupEntityAccess",
                "UserShare",
                "UserTerritory2Association",
                "Vehicle__ChangeEvent",
                "Vehicle__History",
                "VerificationHistory",
                "VisualforceAccessMetrics",
                "Vote",
                "WebLink",
                "Websites__ChangeEvent",
                "WorkOrder",
                "WorkOrderChangeEvent",
                "WorkOrderFeed",
                "WorkOrderHistory",
                "WorkOrderLineItem",
                "WorkOrderLineItemChangeEvent",
                "WorkOrderLineItemFeed",
                "WorkOrderLineItemHistory",
                "WorkOrderLineItemStatus",
                "WorkOrderShare",
                "WorkOrderStatus",
                "WorkType",
                "WorkTypeChangeEvent",
                "WorkTypeFeed",
                "WorkTypeGroup",
                "WorkTypeGroupFeed",
                "WorkTypeGroupHistory",
                "WorkTypeGroupMember",
                "WorkTypeGroupMemberFeed",
                "WorkTypeGroupMemberHistory",
                "WorkTypeGroupShare",
                "WorkTypeHistory",
                "WorkTypeShare",
                "Work_Part__ChangeEvent",
                "Work_Part__History",
                "a__ChangeEvent",
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa__ChangeEvent",
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa__History",
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa__Share",
                "b__ChangeEvent",
                "b__Share",
                "d__ChangeEvent",
                "d__Share",
                "ltnadptn__Lightning_Adoption_Report_Snapshot__ChangeEvent",
                "sad__ChangeEvent",
                "sad__Share"
            ]
        };
    },
    methods: {
        getAvailableGlobalValueSets() {
            window.vscode.post({ cmd: "getAvailableGlobalValueSets" });
        },
        getAvailableObjects() {
            window.vscode.post({ cmd: "getAllObjectNames" });
        },
        checkValidity() {
            this.$nextTick(function() {
                this.field._isValid =
                    this.$refs.fieldForm.checkValidity() !== false;
            });
        }
    }
};
</script>

<style></style>
