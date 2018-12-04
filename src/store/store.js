import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex, {
});

export const store = new Vuex.Store({
    state: {
        user: null,
        visControl: {
            signup: false,
            login: false,
            main: false,
            PP: true
        },
        dataFromFB: {},
        addDataToFBStatus: {status: false}
    },
    getters: getters,
    mutations: mutations,
    actions: actions
});