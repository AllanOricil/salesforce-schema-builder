import Vue from 'vue';
import Vuex from 'vuex';
import {
    sobjects
} from './sobjects';

import {
    globalvaluesets
} from './globalvaluesets';

import {
    orgInfo
} from './orgInfo';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        sobjects,
        globalvaluesets,
        orgInfo
    }
});
