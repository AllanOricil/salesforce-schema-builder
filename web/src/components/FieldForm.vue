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
                    <option value="AutoNumber">Auto Number</option>
                    <option value="Formula">Formula</option>
                    <option value="Lookup">Lookup</option>
                    <option value="MasterDetail">Master Detail</option>
                    <option value="Checkbox">Checkbox</option>
                    <option value="Currency">Currency</option>
                    <option value="Date">Date</option>
                    <option value="DateTime">Date/Time</option>
                    <option value="Email">Email</option>
                    <option value="Location">Geolocation</option>
                    <option value="Number">Number</option>
                    <option value="Percent">Percent</option>
                    <option value="Phone">Phone</option>
                    <option value="Picklist">Picklist</option>
                    <option value="MultiselectPicklist"
                        >Picklist (Multi-Select)</option
                    >
                    <option value="Text">Text</option>
                    <option value="TextArea">Text Area</option>
                    <option value="LongTextArea">Text Area (Long)</option>
                    <option value="Html">Text Area (Rich)</option>
                    <option value="EncryptedText">Text (Encrypted)</option>
                    <option value="Time">Time</option>
                    <option value="Url">URL</option>
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
                    <option value="Checkbox">Checkbox</option>
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
                        :value="object.name"
                        >{{ object.name }}</option
                    >
                </select>
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
                v-if="field.type === 'Lookup' || field.type === 'MasterDetail'"
                class="form-group col-12"
            >
                <label for="fieldRelationshipName"
                    >Child Relationship Name</label
                >
                <input
                    type="text"
                    class="form-control"
                    id="fieldRelationshipName"
                    maxlength="40"
                    required
                    pattern="^(?!.*__)(?!.*_$)[A-Za-z]\w*$"
                    v-model="field.relationshipName"
                    @keyup="checkValidity"
                />
            </div>
            <div
                v-if="field.type === 'Lookup' || field.type === 'MasterDetail'"
                class="form-group col-12"
            >
                <label for="fieldRelationshipLabel">Related List Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="fieldRelationshipLabel"
                    maxlength="40"
                    required
                    v-model="field.relationshipLabel"
                    @keyup="checkValidity"
                />
            </div>
            <div
                v-if="
                    field.formulaType === 'Number' ||
                    field.formulaType === 'Currency' ||
                    field.formulaType === 'Percent'
                "
                class="form-group col-12"
            >
                <label for="fieldFormulaPrecision">Decimal Places</label>
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
            <!--<div
                v-if="
                    field.type !== 'Checkbox' &&
                        field.type !== 'Phone' &&
                        field.type !== 'Picklist' &&
                        field.type !== 'MultiselectPicklist' &&
                        field.type !== 'Lookup' &&
                        field.type !== 'MasterDetail'
                "
                class="form-group col-12"
            >
                <label for="fieldDefaultValue">{{
                    field.type === "Formula" ? "Formula" : "Default Value"
                }}</label>
                <textarea
                    class="form-control"
                    id="fieldDefaultValue"
                    rows="2"
                    v-model="defaultValue"
                    :required="field.type === 'Formula'"
                    @keyup="checkValidity"
                ></textarea>
      </div>-->
            <formula-editor
                class="form-group col-12"
                v-if="
                    field.type !== 'Checkbox' &&
                    field.type !== 'Phone' &&
                    field.type !== 'Picklist' &&
                    field.type !== 'MultiselectPicklist' &&
                    field.type !== 'Lookup' &&
                    field.type !== 'MasterDetail' &&
                    field.type !== 'AutoNumber'
                "
                v-model="defaultValue"
            ></formula-editor>
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
                    field.type === 'Location' ? 'col-12' : 'pl-2 col-6',
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
                    <option :value="false">Degrees, Minutes, Seconds</option>
                    <option :value="true">Decimal</option>
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
                        v-for="(globalValueSet,
                        index) in orderedGlobalValueSets"
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
                <small class="form-text text-muted"
                    >Enter values, with each value separated by a new
                    line</small
                >
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
                    maxlength="999"
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
                    maxlength="999"
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
                    field.type !== 'Formula' &&
                    field.type !== 'MasterDetail'
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
                    Treat blank fields as zeroes
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
            <div v-if="field.type === 'MasterDetail'" class="form-group col-12">
                <label
                    class="form-check-label custom-checkbox-container"
                    for="fieldWriteRequiresMasterRead"
                >
                    Requires Read/Write access to the Master Record to modify
                    the Detail Record
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="fieldWriteRequiresMasterRead"
                        v-model="field.writeRequiresMasterRead"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div v-if="field.type === 'MasterDetail'" class="form-group col-12">
                <label
                    class="form-check-label custom-checkbox-container"
                    for="fieldReparentableMasterDetail"
                >
                    Child Records can be Reparented
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="fieldReparentableMasterDetail"
                        v-model="field.reparentableMasterDetail"
                        @keyup="checkValidity"
                    />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div v-if="field.type === 'Lookup'" class="form-group col-12">
                <label
                    class="form-check-label custom-checkbox-container"
                    for="fieldDeleteConstraint"
                >
                    Clear the lookup value on delete?
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="fieldDeleteConstraint"
                        v-model="field.deleteConstraint"
                        :disabled="field.required"
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
import FormulaEditor from "./FormulaEditor.vue";
import whitelistedStandardSObjects from "../../static/json/whiteListedStandardSObjectsForRelationship.json";

export default {
    components: {
        FormulaEditor,
    },
    props: {
        editingField: Object,
    },
    computed: {
        standardObjects() {
            return Object.values(this.$store.state.sobjects.sobjects).filter(
                (object) => {
                    return !(
                        /^\w*__x\b$/g.test(object.name) ||
                        /^\w*__c\b$/g.test(object.name)
                    );
                }
            );
        },
        shareObjets() {
            return Object.values(
                this.$store.state.sobjects.sobjects
            ).filter((object) => /^\w*Share\b$/g.test(object.name));
        },
        referenceAbleObjects() {
            return this.$store.getters["sobjects/referenceAbleObjects"];
        },
        changeEventObjets() {
            return Object.values(
                this.$store.state.sobjects.sobjects
            ).filter((object) => /^\w*ChangeEvent\b$/g.test(object.name));
        },
        historyObjects() {
            return Object.values(
                this.$store.state.sobjects.sobjects
            ).filter((object) => /^\w*History\b$/.test(object.name));
        },
        customObjects() {
            return Object.values(
                this.$store.state.sobjects.sobjects
            ).filter((object) => /^\w*__c\b$/g.test(object.name));
        },
        externalObjects() {
            return Object.values(
                this.$store.state.sobjects.sobjects
            ).filter((object) => /^\w*__x\b$/g.test(object.name));
        },
        orderedGlobalValueSets() {
            return Object.values(
                this.$store.state.globalvaluesets.globalValueSets
            ).sort(function (a, b) {
                return a.fullName
                    .toLowerCase()
                    .localeCompare(b.fullName.toLowerCase());
            });
        },
    },
    watch: {
        "field.type"(newValue) {
            if (
                this.field.type !== "Lookup" &&
                this.field.type !== "MasterDetail"
            ) {
                this.field.referenceTo = undefined;
                this.field.relationshipLabel = undefined;
                this.field.relationshipName = undefined;
            }

            if (this.field.type !== "Lookup") {
                this.field.deleteConstraint = undefined;
            } else {
                this.field.required = this.field.required || false;
            }

            if (this.field.type !== "MasterDetail") {
                this.field.reparentableMasterDetail = undefined;
                this.field.writeRequiresMasterRead = undefined;
                this.field.relationshipOrder = undefined;
            }

            if (this.field.type !== "Formula") {
                this.field.formulaType = undefined;
                this.field.formulaTreatBlanksAs = undefined;
                this.field.formula = undefined;
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
                        values: undefined,
                    },
                    makeFirstValueDefault: false,
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

            if (
                this.field.type === "Checkbox" ||
                this.field.type === "LongTextArea" ||
                this.field.type === "Html" ||
                this.field.type === "AutoNumber" ||
                this.field.type === "Formula" ||
                this.field.type === "MasterDetail"
            ) {
                this.field.required = undefined;
            }

            if (
                this.field.type !== "Email" &&
                this.field.type !== "Number" &&
                this.field.type !== "Text" &&
                this.field.type !== "AutoNumber"
            ) {
                this.field.externalId = undefined;
            }

            if (
                this.field.type !== "Email" &&
                this.field.type !== "Number" &&
                this.field.type !== "Text"
            ) {
                this.field.unique = undefined;
            }

            if (newValue !== "Checkbox") {
                this.field.defaultValue = undefined;
            }

            this.checkValidity();
        },
        "field.required"(newValue) {
            if (this.field.type === "Lookup" && newValue) {
                this.field.deleteConstraint = false;
            }
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
            this.$nextTick(function () {
                if (typeof this.field.defaultValue !== "undefined")
                    this.defaultValue = he.unescape(
                        he.decode(String(this.field.defaultValue))
                    );
                else this.defaultValue = undefined;
            });

            if (
                this.field.type === "Picklist" ||
                this.field.type === "MultiselectPicklist"
            ) {
                if (
                    this.field.valueSet.restricted === null ||
                    typeof this.field.valueSet.restricted === "undefined"
                )
                    this.field.valueSet.restricted = true;
                this.valueSet.restricted = this.field.valueSet.restricted;

                if (this.field.valueSet.valueSetDefinition.value) {
                    this.useGlobalPicklistValueSet = 2;
                    this.field.valueSet.value;
                    this.valueSet.valueSetDefinition.value = this.field.valueSet.valueSetDefinition.value.reduce(
                        (previous, current, index) => {
                            return (
                                previous +
                                (index === 0 ? "" : "\n") +
                                current.fullName
                            );
                        },
                        ""
                    );
                } else {
                    this.useGlobalPicklistValueSet = 1;
                    this.valueSet.valueSetName = this.field.valueSet.valueSetName;
                    this.field.valueSet.valueSetDefinition = undefined;
                }

                if (
                    this.field.valueSet.valueSetDefinition &&
                    this.field.valueSet.valueSetDefinition.value &&
                    this.field.valueSet.valueSetDefinition.value.length
                ) {
                    this.valueSet.makeFirstValueDefault = this.field.valueSet.valueSetDefinition.value[0].default;
                    this.valueSet.valueSetDefinition.sorted = this.field.valueSet.valueSetDefinition.sorted;
                }
            } else {
                this.field.valueSet = undefined;
            }
        },
        field: {
            deep: true,
            handler() {
                this.checkValidity();
            },
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
            if (this.field.type === "Text" && !newValue)
                this.field.caseSensitive = undefined;
            if (this.field.type === "Email" && newValue)
                this.field.caseSensitive = newValue;
            else this.field.caseSensitive = undefined;
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
                if (
                    this.field.type === "Picklist" ||
                    this.field.type === "MultiselectPicklist"
                ) {
                    this.field.valueSet = JSON.parse(JSON.stringify(newValue));

                    if (typeof newValue.restricted === "undefined")
                        this.field.valueSet.restricted = true;
                    else this.field.valueSet.restricted = newValue.restricted;

                    if (
                        newValue.valueSetDefinition &&
                        newValue.valueSetDefinition.value
                    ) {
                        this.field.valueSet.valueSetDefinition.value = newValue.valueSetDefinition.value
                            .split("\n")
                            .map((value, index) => {
                                return {
                                    fullName: value,
                                    label: value,
                                    default:
                                        index === 0 &&
                                        newValue.makeFirstValueDefault,
                                };
                            });
                    } else {
                        this.field.valueSet.valueSetDefinition = undefined;
                    }
                    delete this.field.valueSet.makeFirstValueDefault;
                }
            },
        },
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
                formulaType: undefined,
            },
            valueSet: {
                valueSetName: undefined,
                restricted: undefined,
                valueSetDefinition: {
                    sorted: undefined,
                    value: undefined,
                },
                makeFirstValueDefault: false,
            },
            fieldName: undefined,
            defaultValue: undefined,
            useGlobalPicklistValueSet: 1,
        };
    },
    methods: {
        checkValidity() {
            this.$nextTick(function () {
                this.field._isValid =
                    this.$refs.fieldForm.checkValidity() !== false;
            });
        },
    },
};
</script>

<style></style>
