import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import TodosModule from './storeModules/TodosModule';
import AuthModule from './storeModules/AuthModule';

export const store = new Vuex.Store({
    modules: {
        TodosModule,
        AuthModule
    }
});