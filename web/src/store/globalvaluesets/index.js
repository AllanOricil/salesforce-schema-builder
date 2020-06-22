import {
    getters
} from './getters'
import {
    actions
} from './actions'
import {
    mutations
} from './mutations'


const state = {
    globalValueSets: []
}

const namespaced = true;


export const globalvaluesets = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};
