<template>
    <div>
        <label>Default Value</label>
        <div class="d-flex flex-column flex-xl-row">
            <div class="form-group col-12 col-xl-6 mb-2 pr-0 pr-xl-4">
                <label for="formulaFunctions">Functions</label>
                <div class="d-flex">
                    <div class="d-flex mb-0 pl-0 pr-1 flex-grow-1">
                        <select
                            class="form-control"
                            id="formulaFunctions"
                            v-model="formulaType"
                        >
                            <option value="ABS(number)" selected>ABS</option>
                            <option value="ADDMONTHS(date,num)"
                                >ADDMONTHS</option
                            >
                            <option value="AND(logical1,logical2,...)"
                                >AND</option
                            >
                            <option value="BEGINS(text, compare_text)"
                                >BEGINS</option
                            >
                            <option
                                value="BLANKVALUE(expression, substitute_expression)"
                                >BLANKVALUE</option
                            >
                            <option value="BR()">BR</option>
                            <option
                                value="CASE(expression, value1, result1, value2, result2,...,else_result)"
                                >CASE</option
                            >
                            <option value="CASESAFEID(id)">CASESAFEID</option>
                            <option value="CEILING(number)">CEILING</option>
                            <option value="CONTAINS(text, compare_text)"
                                >CONTAINS</option
                            >
                            <option value="CURRENCYRATE(IsoCode)"
                                >CURRENCYRATE</option
                            >
                            <option value="DATE(year,month,day)">DATE</option>
                            <option value="DATETIMEVALUE(expression)"
                                >DATETIMEVALUE</option
                            >
                            <option value="DATEVALUE(expression)"
                                >DATEVALUE</option
                            >
                            <option value="DAY(date)">DAY</option>
                            <option value="DISTANCE(location, location, unit)"
                                >DISTANCE</option
                            >
                            <option value="EXP(number)">EXP</option>
                            <option
                                value="FIND(search_text, text [, start_num])"
                                >FIND</option
                            >
                            <option value="FLOOR(number)">FLOOR</option>
                            <option value="GEOLOCATION(latitude, longitude)"
                                >GEOLOCATION</option
                            >
                            <option value="GETSESSIONID()">GETSESSIONID</option>
                            <option value="HOUR(expression)">HOUR</option>
                            <option
                                value="HYPERLINK(url, friendly_name [, target])"
                                >HYPERLINK</option
                            >
                            <option
                                value="IF(logical_test, value_if_true, value_if_false)"
                                >IF</option
                            >
                            <option
                                value="IMAGE(image_url, alternate_text [, height, width])"
                                >IMAGE</option
                            >
                            <option
                                value="INCLUDES(multiselect_picklist_field, text_literal)"
                                >INCLUDES</option
                            >
                            <option value="ISBLANK(expression)">ISBLANK</option>
                            <option value="ISNULL(expression)">ISNULL</option>
                            <option value="ISNUMBER(Text)">ISNUMBER</option>
                            <option
                                value="ISPICKVAL(picklist_field, text_literal)"
                                >ISPICKVAL</option
                            >
                            <option value="LEFT(text, num_chars)">LEFT</option>
                            <option value="LEN(text)">LEN</option>
                            <option value="LN(number)">LN</option>
                            <option value="LOG(number)">LOG</option>
                            <option value="LOWER(text)">LOWER</option>
                            <option
                                value="LPAD(text, padded_length [, pad_string])"
                            >
                                LPAD
                            </option>
                            <option value="MAX(number,number,...)">MAX</option>
                            <option value="MCEILING(number)">MCEILING</option>
                            <option value="MFLOOR(number)">MFLOOR</option>
                            <option value="MID(text, start_num, num_chars)"
                                >MID</option
                            >
                            <option value="MILLISECOND(expression)"
                                >MILLISECOND</option
                            >
                            <option value="MIN(number,number,...)">MIN</option>
                            <option value="MINUTE(expression)">MINUTE</option>
                            <option value="MOD(number,divisor)">MOD</option>
                            <option value="MONTH(date)">MONTH</option>
                            <option value="NOT(logical)">NOT</option>
                            <option value="NOW()">NOW</option>
                            <option
                                value="NULLVALUE(expression, substitute_expression)"
                                >NULLVALUE</option
                            >
                            <option value="OR(logical1,logical2,...)"
                                >OR</option
                            >
                            <option value="RIGHT(text, num_chars)"
                                >RIGHT</option
                            >
                            <option value="ROUND(number,num_digits)"
                                >ROUND</option
                            >
                            <option
                                value="RPAD(text, padded_length [, pad_string])"
                                >RPAD</option
                            >
                            <option value="SECOND(expression)">SECOND</option>
                            <option value="SQRT(number)">SQRT</option>
                            <option value="SUBSTITUTE(text, old_text, new_text)"
                                >SUBSTITUTE</option
                            >
                            <option value="TEXT(value)">TEXT</option>
                            <option value="TIMENOW()">TIMENOW</option>
                            <option value="TIMEVALUE(expression)"
                                >TIMEVALUE</option
                            >
                            <option value="TODAY()">TODAY</option>
                            <option value="TRIM(text)">TRIM</option>
                            <option value="UPPER(text)">UPPER</option>
                            <option value="VALUE(text)">VALUE</option>
                            <option value="WEEKDAY(date)">WEEKDAY</option>
                            <option value="YEAR(date)">YEAR</option>
                        </select>
                    </div>
                    <div class="d-flex pl-auto pr-0 mx-auto mb-0">
                        <button
                            class="btn btn-primary my-auto"
                            @click="addFunction()"
                        >
                            <span class="fa fa-plus"></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="form-group col-12 col-xl-6 mb-2">
                <label for="formulaOperators">Operators</label>
                <div class="d-flex">
                    <div class="d-flex mb-0 pl-0 pr-1 flex-grow-1">
                        <select
                            class="form-control"
                            id="formulaOperators"
                            v-model="operator"
                        >
                            <option value="+" selected>+ Add</option>
                            <option value="-">- Subtract</option>
                            <option value="*">* Multiply</option>
                            <option value="/">/ Divide</option>
                            <option value="^">^ Exponentiation</option>
                            <option value="(">( Open Parenthesis</option>
                            <option value=")">) Close Parenthesis</option>
                            <option value="&">& Concatenate</option>
                            <option value="=">= Equal</option>
                            <option value="<"><> Not Equal</option>
                            <option value="<">< Less Than</option>
                            <option value=">">> Greater Than</option>
                            <option value="<="><= Less Than or Equal</option>
                            <option value=">=">>= Greater Than or Equal</option>
                            <option value="&&">&& And</option>
                            <option value="||">|| Or</option>
                        </select>
                    </div>
                    <div class="d-flex pl-auto pr-0 mx-auto mb-0">
                        <button
                            class="btn btn-primary my-auto"
                            @click="addOperator()"
                        >
                            <span class="fa fa-plus"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group col-12 mb-2">
            <codemirror
                ref="cmEditor"
                v-model="formula"
                :options="cmOptions"
                heigth="200px"
                @ready="onCmReady"
                @cursorActivity="onCmCursorActivity"
            />
        </div>
        <div class="form-group col-12">
            <b-button v-b-modal.modal-1>Insert Field</b-button>
        </div>
        <b-modal
            id="modal-1"
            size="xl"
            title="Insert Field"
            centered
            cancel-disabled
        >
            <div class="container">
                <select
                    v-for="(picklist, index) in picklists"
                    :key="index"
                    size="10"
                    class="mr-2"
                    v-model="picklist.selected"
                >
                    <option
                        v-for="(option, optionIndex) in picklist.options"
                        :key="index + '' + optionIndex"
                        v-if="option.isVisible"
                        :value="JSON.stringify(option)"
                        @click="
                            option.hasNext
                                ? addPicklistWithOptions($event, index)
                                : removeNext(index)
                        "
                        >{{
                            option.label + (option.hasNext ? ' ⮞' : '')
                        }}</option
                    >
                </select>
            </div>

            <div class="container text-wrap mt-2">
                <span id="formula">{{ fieldToInsert }}</span>
            </div>

            <template v-slot:modal-footer="{ close }">
                <button
                    type="button"
                    class="btn btn-md danger"
                    @click="close()"
                >
                    Close
                </button>
                >
                <button
                    type="button"
                    class="btn btn-md danger"
                    @click="insertField()"
                >
                    Insert
                </button>
                >
            </template>
        </b-modal>
    </div>
</template>

<script>
import apiList from '../../static/json/apiList.json';
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/mathematica/mathematica.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/vscode-dark.css';
import 'codemirror/theme/dracula.css';

export default {
    components: {
        codemirror,
    },
    props: {
        value: {
            type: String,
            required: true,
            default: '',
        },
    },
    data() {
        return {
            cmOptions: {
                tabSize: 4,
                mode: 'mathematica',
                theme: 'vscode-dark',
                lineNumbers: true,
                lineWrapping: true,
                line: true,
            },
            operator: '',
            formulaType: '',
            formula: '',
            picklists: [
                {
                    options: [
                        {
                            label: 'Object',
                            value: '',
                            isVisible: true,
                            hasNext: true,
                        },
                        {
                            label: 'API',
                            value: '$Api',
                            isVisible: true,
                            hasNext: true,
                        },
                        {
                            label: 'Label',
                            value: '$Label',
                            isVisible: false,
                            hasNext: true,
                        },
                        {
                            label: 'Organization',
                            value: '$Organization',
                            isVisible: true,
                            hasNext: true,
                        },
                        {
                            label: 'Profile',
                            value: '$Profile',
                            isVisible: true,
                            hasNext: true,
                        },
                        {
                            label: 'System',
                            value: '$System',
                            isVisible: true,
                            hasNext: true,
                        },
                        {
                            label: 'User',
                            value: '$User',
                            reference: 'User',
                            isVisible: true,
                            hasNext: true,
                        },
                        {
                            label: 'User Role',
                            value: '$UserRole',
                            reference: 'UserRole',
                            isVisible: true,
                            hasNext: true,
                        },
                    ],
                    selected: undefined,
                },
            ],
            cursorPosition: {},
        };
    },
    computed: {
        codemirror() {
            return this.$refs.cmEditor.codemirror;
        },
        labels() {
            return this.$store.getters['customlabels/getNames'];
        },
        fieldToInsert() {
            return this.picklists.reduce(function (
                previous,
                current,
                index,
                array
            ) {
                let valueToConcatenate =
                    typeof current.selected !== 'undefined'
                        ? JSON.parse(current.selected).value
                        : '';
                return (
                    previous +
                    (previous !== '' && index > 0 && valueToConcatenate
                        ? '.'
                        : '') +
                    valueToConcatenate
                );
            },
            '');
        },
        userFields() {
            return this.$store.getters['sobjects/getSObjectFields']('User');
        },
    },
    watch: {
        formula() {
            this.$emit('input', this.formula);
        },
        labels(newValue) {
            if (newValue.length > 0) {
                this.picklists[0].options[2].isVisible = true;
            }
        },
    },
    methods: {
        addOperator() {
            this.codemirror.doc.replaceSelection(this.operator);
        },
        addFunction() {
            this.codemirror.doc.replaceSelection(this.formulaType);
        },
        addPicklistWithOptions(e, index) {
            const picklist = JSON.parse(e.target.value);
            const picklistValue = picklist.value;
            const picklistReference = picklist.reference;
            this.picklists.splice(index + 1);

            let newPicklist = {
                options: [],
                selected: undefined,
            };

            if (index === 0) {
                if (picklistValue === '') {
                    newPicklist.options = [
                        {
                            label: 'Name',
                            value: 'Name',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Created By',
                            value: 'CreatedBy',
                            reference: 'User',
                            isVisible: true,
                            hasNext: true,
                        },
                        {
                            label: 'Created By Id',
                            value: 'CreatedById',
                            reference: 'User',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Owner (Queue)',
                            value: 'Owner:Queue',
                            isVisible: true,
                            hasNext: true,
                        },
                        {
                            label: 'Owner (User)',
                            value: 'Owner:User',
                            reference: 'User',
                            isVisible: true,
                            hasNext: true,
                        },
                        {
                            label: 'Owner Id',
                            value: 'OwnerId',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Created Date',
                            value: 'CreatedDate',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Last Modified By',
                            value: 'LastModifiedBy',
                            reference: 'User',
                            isVisible: true,
                            hasNext: true,
                        },
                        {
                            label: 'Last Modified By Id',
                            value: 'LastModifiedById',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Last Modified Date',
                            value: 'LastModifiedDate',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Record Id',
                            value: 'RecordId',
                            isVisible: true,
                            hasNext: false,
                        },
                    ];
                } else if (picklistValue === '$Label') {
                    this.labels.forEach((label) => {
                        newPicklist.options.push({
                            label,
                            value: label,
                            isVisible: true,
                        });
                    });
                } else if (picklistValue === '$Api') {
                    newPicklist.options = apiList.options;
                } else if (picklistValue === '$System') {
                    newPicklist.options.push({
                        label: 'Origin Date Time',
                        value: 'OriginDateTime',
                        isVisible: true,
                        hasNext: false,
                    });
                } else if (picklistValue === '$Profile') {
                    newPicklist.options = [
                        {
                            label: 'Created Date',
                            value: 'CreatedDate',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Description',
                            value: 'Description',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Last Modified By Id',
                            value: 'LastModifiedById',
                            isVisible: true,
                            hasNext: true,
                        },
                        {
                            label: 'Last Modified Date',
                            value: 'LastModifiedDate',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Manage Users',
                            value: 'ManageUsers',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Name',
                            value: 'Name',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Profile Id',
                            value: 'ProfileId',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Usage Type',
                            value: 'UsageType',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'User Type',
                            value: 'UserType',
                            isVisible: true,
                            hasNext: false,
                        },
                    ];
                } else if (picklistValue === '$UserRole') {
                    newPicklist.options = [
                        {
                            label: 'Case Access Level for Account Owner',
                            value: 'CaseAccessForAccountOwner',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Contact Access Level for Account Owner',
                            value: 'ContactAccessForAccountOwner',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Description',
                            value: 'RollupDescription',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Developer Name',
                            value: 'DeveloperName',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Last Modified Date',
                            value: 'LastModifiedDate',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'May Forecast Manager Share',
                            value: 'MayForecastManagerShare',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Name',
                            value: 'Name',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Opportunity Access Level for Account Owner',
                            value: 'OpportunityAccessForAccountOwner',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Portal Role',
                            value: 'PortalRole',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Portal Type',
                            value: 'PortalType',
                            isVisible: true,
                            hasNext: false,
                        },
                        {
                            label: 'Role ID',
                            value: 'Id',
                            isVisible: true,
                            hasNext: false,
                        },
                    ];
                }
            } else {
                if (picklistReference) {
                    this.$store.getters['sobjects/getSObjectFields'](
                        picklistReference
                    ).forEach((field) => {
                        if (field.referenceTo.length > 0) {
                            if (
                                this.$store.getters[
                                    'sobjects/getSObjectFields'
                                ](field.referenceTo[0]).length === 0
                            ) {
                                this.$store.dispatch(
                                    'sobjects/getSObjectDescribe',
                                    field.referenceTo[0]
                                );
                            }
                            newPicklist.options.push({
                                label: field.label,
                                value: field.relationshipName,
                                reference: field.referenceTo[0],
                                isVisible: true,
                                hasNext: true,
                            });

                            newPicklist.options.push({
                                label: field.label,
                                value: field.name,
                                isVisible: true,
                                hasNext: false,
                            });
                        } else {
                            if (this.canBeUsedInFormula(field))
                                newPicklist.options.push({
                                    label: field.label,
                                    value: field.name,
                                    isVisible: true,
                                    hasNext: field.referenceTo.length > 0,
                                });
                        }
                    });
                }
            }

            this.picklists.push(newPicklist);
        },
        canBeUsedInFormula(field) {
            return (field.type === 'textarea' && field.length > 255) ||
                field.type === 'encryptedstring' ||
                field.name === 'Description'
                ? false
                : true;
        },
        removeNext(index) {
            this.picklists.splice(index + 1);
        },
        insertField() {
            this.codemirror.doc.replaceSelection(this.fieldToInsert);
            this.$bvModal.hide('modal-1');
        },
        onCmReady(cm) {
            cm.setSize(null, 200);
        },
    },
};
</script>

<style scoped>
.container {
    overflow-x: auto;
    white-space: nowrap;
    padding: 0;
}

#formula {
    color: var(--vscode-menu-foreground) !important;
    font-family: var(--vscode-font-family) !important;
    font-weight: var(--vscode-font-weight) !important;
    font-size: 18px !important;
}
</style>
