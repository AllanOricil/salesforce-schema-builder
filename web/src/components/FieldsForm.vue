<template>
    <div class="row h-100">
        <div class="col-6">
            <fields-manager
                ref="fieldsManager"
                @onEdit="setEditingField"
            ></fields-manager>
        </div>
        <div class="col-6">
            <field-form v-if="field" :editingField="field"></field-form>
        </div>
    </div>
</template>

<script>
import FieldForm from "./FieldForm.vue";
import FieldsManager from "./FieldsManager.vue";
export default {
    components: {
        FieldForm,
        FieldsManager
    },
    data() {
        return {
            field: undefined
        };
    },
    computed: {
        isDataValid() {
            return this.$refs.fieldsManager.areFieldsValid;
        }
    },
    methods: {
        setEditingField(field) {
            this.field = field;
        },
        getData() {
            return this.$refs.fieldsManager.fields;
        }
    }
};
</script>

<style></style>
