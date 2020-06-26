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
    customlabels: []
}

const namespaced = true;


export const customlabels = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};
