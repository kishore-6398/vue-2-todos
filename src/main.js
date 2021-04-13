import Vue from 'vue'
import App from './App.vue'

import { store } from './store';

store.dispatch('autoLogin');

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue"
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate);

import { router } from './routes'

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
