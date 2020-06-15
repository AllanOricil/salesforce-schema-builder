<template>
    <div class="d-flex flex-column pt-3" style="max-height:100%">
        <button
            type="button"
            class="btn btn-primary mb-3"
            style="margin-top:14px"
            @click="addField()"
        >
            New Field
        </button>
        <div class="row justify-content-between px-3 mb-4">
            <h2 class="text-uppercase">Fields</h2>
            <input
                type="search"
                class="col-12 col-lg-9 w-100 justify-content-end my-lg-1 my-0"
                style="height: 38px"
                placeholder="Search Field"
                @keyup="searchField"
            />
        </div>
        <div
            class="overflow-auto flex-grow-1 pr-0 pr-lg-3"
            style="height: 950px"
        >
            <field-manager-field-entry
                v-for="(field, index) in filteredFields"
                :key="index"
                :field="field"
                :index="index"
                class="mb-2"
                @onEdit="requestEdit"
                @onRemove="removeEntryFromFields"
            >
            </field-manager-field-entry>
        </div>
    </div>
</template>

<script>
import FieldManagerFieldEntry from "./FieldManagerFieldEntry.vue";
export default {
    components: {
        FieldManagerFieldEntry
    },
    data() {
        return {
            fields: [],
            searchValue: undefined
        };
    },
    computed: {
        filteredFields() {
            if (this.searchValue !== undefined) {
                return this.fields.filter(value => {
                    return value.fullName.includes(this.searchValue);
                });
            } else {
                return this.fields;
            }
        }
    },
    methods: {
        addField() {
            const field = {
                _isValid: false,
                fullName: `New_Field_${this.fields.length}__c`,
                externalId: undefined,
                label: `New_Field_${this.fields.length}`,
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
            };
            this.fields.push(field);
            this.$emit("addedField", field);
        },
        searchField(e) {
            this.searchValue = e.target.value;
        },
        requestEdit(e) {
            this.$emit("onEdit", e);
        },
        removeEntryFromFields(e) {
            this.fields.splice(e, 1);
        }
    }
};
</script>

<style></style>
