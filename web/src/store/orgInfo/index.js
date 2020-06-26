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
    orgInfo: {}
}

const namespaced = true;


export const orgInfo = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};
