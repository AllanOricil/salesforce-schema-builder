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
    sobjects: {},
    sobjectsWithDetails: {}
}

const namespaced = true;


export const sobjects = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};
