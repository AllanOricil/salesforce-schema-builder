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
                    v-model="fieldName"
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
                    <option value="1">Use global picklist value set </option>
                    <option value="2"
                        >Enter values, with each value separated by a new line
                    </option>
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
                    v-model="field.valueSet.valueSetName"
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
                    v-model="field.valueSet.valueSetDefinition.values"
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
                        v-model="field.valueSet.valueSetDefinition.sorted"
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
                        v-model="picklistMakeFirstValueDefault"
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
                        v-model="field.valueSet.restricted"
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
                <label for="fieldHelpText">Help Text</label>
                <textarea
                    class="form-control"
                    id="fieldHelpText"
                    rows="2"
                    v-model="field.helpText"
                    @keyup="checkValidity"
                ></textarea>
            </div>
            <div
                v-if="
                    field.type !== 'Checkbox' &&
                        field.type !== 'LongTextArea' &&
                        field.type !== 'Html'
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
                        field.type === 'Text'
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
        </div>
    </form>
</template>

<script>
import he from "he";
export default {
    props: {
        editingField: Object
    },
    beforeMount() {
        this.getAvailableGlobalValueSets();
        window.addEventListener("message", event => {
            const message = event.data;
            if (message.name === "globalValueSets") {
                this.globalValueSets = message.data.result;
                console.log(this.globalValueSets);
            }
        });
    },
    watch: {
        "field.type"(newValue) {
            if (newValue === "Checkbox") {
                this.field.defaultValue = true;
            }

            if (
                newValue === "Currency" ||
                newValue === "Number" ||
                newValue === "Percent"
            ) {
                this.field.scale = 0;
                this.field.precision = 18;
            }

            if (newValue === "Location") {
                this.field.scale = 0;
                this.field.displayLocationInDecimal = true;
            }

            if (newValue === "Picklist" || newValue === "MultiselectPicklist") {
                this.useGlobalPicklistValueSet = 1;
                this.picklistMakeFirstValueDefault = false;
                this.field.valueSet.valueSetDefinition.sorted = false;
                if (newValue === "MultiselectPicklist") {
                    this.field.visibleLines = 4;
                }
            }
            if (newValue === "LongTextArea" || newValue === "Html") {
                this.field.length = 32768;
                this.field.visibleLines = 3;
            }
            if (newValue === "Text" || newValue === "EncryptedText") {
                this.field.length = 1;
            }

            if (newValue === "EncryptedText") {
                this.field.maskChar = "asterisk";
                this.field.maskType = "all";
            }

            this.checkValidity();
        },
        "field.label"() {
            if (this.field.label) {
                this.fieldName = this.field.label.replace(/\s/g, "_");
                this.field.fullName = this.fieldName + "__c";
            }
        },
        "field.valueSet.valueSetDefinition.values"(newValue) {
            this.field.valueSet.valueSetDefinition.values = newValue.replace(
                /^(?:[\t ]*(?:\r?\n|\r))+/gm,
                ""
            );
        },
        defaultValue() {
            if (typeof this.defaultValue !== "undefined")
                this.field.defaultValue = he.escape(this.defaultValue);
        },
        editingField(newValue) {
            this.field = newValue;
            if (typeof this.field.defaultValue !== "undefined")
                this.defaultValue = he.unescape(
                    he.decode(String(this.field.defaultValue))
                );
            else this.defaultValue = undefined;
            this.checkValidity();
        }
    },
    data() {
        return {
            field: {
                fullName: undefined,
                externalId: undefined,
                label: undefined,
                description: undefined,
                helpText: undefined,
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
                valueSet: {
                    valueSetName: undefined,
                    restricted: undefined,
                    valueSetDefinition: {
                        sorted: undefined,
                        values: undefined
                    }
                },
                visibleLines: undefined,
                length: undefined,
                maskChar: undefined,
                maskType: undefined
            },
            fieldName: undefined,
            defaultValue: undefined,
            useGlobalPicklistValueSet: undefined,
            picklistMakeFirstValueDefault: undefined,
            types: [
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
            ]
        };
    },
    methods: {
        getAvailableGlobalValueSets() {
            window.vscode.post({ cmd: "getAvailableGlobalValueSets" });
        },
        checkValidity() {
            console.log(this.$refs.fieldForm.checkValidity() !== false);
        }
    }
};
</script>

<style></style>
