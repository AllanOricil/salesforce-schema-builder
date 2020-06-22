import Vue from 'vue';
import Vuex from 'vuex';
import {
    sobjects
} from './sobjects';

import {
    globalvaluesets
} from './globalvaluesets';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        sobjects,
        globalvaluesets
    }
});
