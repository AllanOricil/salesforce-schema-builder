<template>
    <div :class="['d-flex', isEditing ? 'isEditing' : 'notEditing']">
        <span
            v-if="field._isValid === false"
            class="fas fa-exclamation-triangle my-auto mr-2"
            style="color: var(--vscode-editorOverviewRuler-errorForeground);"
        ></span>
        <span class="field-entry-api-name my-auto mr-3 w-100 text-truncate" style="color: white;">
            {{ field.fullName }}
        </span>
        <button
            :id="`edit-button-${index}`"
            type="button"
            class="btn btn-danger mr-2"
            @click="edit"
        >
            <span class="fas fa-edit"></span>
        </button>
        <button
            :id="`delete-button-${index}`"
            type="button"
            class="btn btn-danger"
            @click="remove"
        >
            <span class="fas fa-trash"></span>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        field: Object,
        index: Number,
        isEditing: Boolean,
    },
    watch: {
        field(newValue) {
            this.fieldData = newValue;
        },
    },
    data() {
        return {
            fieldData: this.field,
        };
    },
    methods: {
        edit() {
            this.$emit('onEdit', this.field);
        },
        remove() {
            this.$emit('onRemove', this.field);
        },
    },
};
</script>

<style scoped>
.isEditing {
    padding-left: 10px;
    border-left: 3px solid var(--vscode-menu-foreground);
}
.notEditing {
    padding-left: 10px;
    border-left: 3px solid transparent;
}

.field-entry-api-name{
    color: var(--vscode-input-foreground) !important;
}
</style>
