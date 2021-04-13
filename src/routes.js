import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import { store } from './store';

import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Main from './views/Main.vue'

const routes = [
    { path: '', component: Login },
    { path: '/signup', component: Signup },
    { path: '/todo', component: Main, 
        beforeEnter(to, from, next) {
            if(store.getters.gettokenID){
                next();
            }
            else{
                next("/");
            }
        }    
    }
];

export const router = new VueRouter({
    routes,
    mode: 'history'
});