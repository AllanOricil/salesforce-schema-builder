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
            <textarea
                class="form-control"
                id="formulaField"
                rows="4"
                v-model="formula"
                required
            ></textarea>
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
                <select size="10">
                    <option>a</option>
                    <option>abcdasdadsadsasd</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                </select>
                <select size="10">
                    <option>a</option>
                    <option>abcdasdadsadsasd</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                </select>
                <select size="10">
                    <option>a</option>
                    <option>abcdasdadsadsasd</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                </select>
                <select size="10">
                    <option>a</option>
                    <option>abcdasdadsadsasd</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                </select>
                <select size="10">
                    <option>a</option>
                    <option>abcdasdadsadsasd</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                </select>
                <select size="10">
                    <option>a</option>
                    <option>abcdasdadsadsasd</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                </select>
                <select size="10">
                    <option>a</option>
                    <option>abcdasdadsadsasd</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                </select>
                <select size="10">
                    <option>a</option>
                    <option>abcdasdadsadsasd</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                </select>
                <select size="10">
                    <option>a</option>
                    <option>abcdasdadsadsasd</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                </select>
                <select size="10">
                    <option>a</option>
                    <option>abcdasdadsadsasd</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                </select>
                <select size="10">
                    <option>a</option>
                    <option>abcdasdadsadsasd</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                </select>
                <select size="10">
                    <option>a</option>
                    <option>abcdasdadsadsasd</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                </select>
                <select size="10">
                    <option>a</option>
                    <option>abcdasdadsadsasd</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                    <option>a</option>
                </select>
            </div>

            <template v-slot:modal-footer="{ close }">
                <b-button size="md" variant="danger" @click="close()"
                    >Close</b-button
                >
                <b-button size="md" variant="danger" @click="insert()"
                    >Insert</b-button
                >
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            required: true,
            default: '',
        },
    },
    data() {
        return {
            operator: '',
            formulaType: '',
            formula: '',
        };
    },
    watch: {
        formula() {
            this.$emit('input', this.formula);
        },
    },
    methods: {
        addOperator() {
            this.formula += this.operator;
        },
        addFunction() {
            this.formula += this.formulaType;
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
</style>
