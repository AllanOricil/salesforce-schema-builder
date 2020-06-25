<template>
    <div class="row h-100">
        <div class="col-6">
            <fields-manager
                ref="fieldsManager"
                @onEdit="setEditingField"
            ></fields-manager>
        </div>
        <div class="col-6">
            <fieldset :disabled="field === undefined">
                <field-form :editingField="field"></field-form>
            </fieldset>
        </div>
    </div>
</template>

<script>
import FieldForm from './FieldForm.vue';
import FieldsManager from './FieldsManager.vue';
export default {
    components: {
        FieldForm,
        FieldsManager,
    },
    data() {
        return {
            field: undefined,
        };
    },
    computed: {
        isValid() {
            return this.$refs.fieldsManager.areFieldsValid;
        },
        fieldsComputedData() {
            return this.$refs.fieldsManager.computedFields;
        },
    },
    methods: {
        setEditingField(field) {
            this.field = field;
        },
    },
};
</script>

<style></style>
