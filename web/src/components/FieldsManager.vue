<template>
    <div class="d-flex flex-column pt-3" style="max-height: 100%;">
        <button
            type="button"
            class="btn btn-primary mb-3"
            style="margin-top: 14px;"
            @click="addField()"
        >
            New Field
        </button>
        <div class="row justify-content-between px-3 mb-4">
            <h2 class="text-uppercase">Fields</h2>
            <input
                type="text"
                class="col-12 col-lg-9 w-100 justify-content-end my-lg-1 my-0"
                style="height: 38px;"
                placeholder="Search by API Name"
                @keyup="search"
                @change="search"
                @emptied="search"
                @abort="search"
            />
        </div>
        <div
            class="overflow-auto flex-grow-1 pr-0 pr-lg-3"
            style="height: 950px;"
        >
            <field-manager-field-entry
                v-for="(field, index) in filteredFields"
                :key="index"
                :field="field"
                :isEditing="field._isEditing"
                class="mb-2"
                @onEdit="requestEdit"
                @onRemove="removeEntryFromFields"
            ></field-manager-field-entry>
        </div>
    </div>
</template>

<script>
import FieldManagerFieldEntry from './FieldManagerFieldEntry.vue';
export default {
    components: {
        FieldManagerFieldEntry,
    },
    data() {
        return {
            fields: [],
            searchValue: '',
        };
    },
    computed: {
        areFieldsValid() {
            if (this.fields.length) {
                if (this.fields.length === 1) return this.fields[0]._isValid;
                else
                    return this.fields.reduce((previous, currentValue) => {
                        return previous && currentValue._isValid;
                    });
            } else return true;
        },
        filteredFields() {
            if (typeof this.searchValue !== 'undefined' && this.fields.length) {
                return this.fields.filter((value) => {
                    return value.fullName
                        .toUpperCase()
                        .includes(this.searchValue.toUpperCase());
                });
            } else {
                return this.fields;
            }
        },
        computedFields() {
            const computedFields = JSON.parse(JSON.stringify(this.fields));
            computedFields.forEach((field) => {
                delete field._isValid;
                delete field._isEditing;
                if (field.type === 'Formula') {
                    if (field.formulaType === 'Cunrrecy') {
                        field.precision = 18;
                    }
                    field.type = field.formulaType;
                    delete field.formulaType;
                    field.formula = field.defaultValue;
                    delete field.defaultValue;
                    if (field.formulaTreatBlanksAs) {
                        field.formulaTreatBlanksAs = 'BlankAsZero';
                    } else {
                        field.formulaTreatBlanksAs = 'BlankAsBlank';
                    }
                }
                if (field.type === 'Lookup') {
                    if (field.deleteConstraint) {
                        field.deleteConstraint = 'SetNull';
                    } else {
                        field.deleteConstraint = 'Restrict';
                    }
                }

                if (
                    field.type !== 'Checkbox' &&
                    field.defaultValue &&
                    !field.defaultValue.replace(/\s/g, '').length
                ) {
                    delete field.defaultValue;
                }
            });
            return computedFields;
        },
    },
    methods: {
        addField() {
            const field = {
                _isEditing: false,
                _isValid: true,
                fullName: `New_Field_${this.fields.length}__c`,
                externalId: undefined,
                label: `New_Field_${this.fields.length}`,
                description: undefined,
                helpText: undefined,
                trackHistory: false,
                trackTrending: false,
                type: 'Checkbox',
                required: undefined,
                unique: undefined,
                defaultValue: undefined,
                precision: undefined,
                scale: undefined,
                caseSensitive: undefined,
                displayLocationInDecimal: undefined,
                valueSet: undefined,
                visibleLines: undefined,
                length: undefined,
                maskChar: undefined,
                maskType: undefined,
            };
            this.fields.push(field);
            this.$emit('onEdit', field);
            this.requestEdit(field);
        },
        search(e) {
            this.searchValue = e.target.value;
        },
        requestEdit(e) {
            this.$emit('onEdit', e);
            this._changeAllFieldsToNotEditing();
            e._isEditing = true;
        },
        removeEntryFromFields(e) {
            this.fields.splice(this._findFieldInArray(e), 1);
        },
        _findFieldInArray(lookingField) {
            const fieldFound = this.fields.find((field) => {
                return field.fullName === lookingField.fullName;
            });
            return this.fields.indexOf(fieldFound);
        },
        _changeAllFieldsToNotEditing() {
            this.fields.forEach((field) => (field._isEditing = false));
        },
    },
};
</script>

<style></style>
