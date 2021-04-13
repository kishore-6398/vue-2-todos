import axios from 'axios';
import { router } from '../routes';
import { store } from '../store'
import swal from 'sweetalert';

const state = {
    tokenID: "",
    user: ""
};

const mutations = {
    signupUserFB(state, payLoad){
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJlQGZ4XlOfFN6CzY66tjlGEmyX0LmGHo",
        {
            email: payLoad.email,
            password: payLoad.password,
            returnSecureToken: true
        })
        .then(res => {
            console.log(res.data.email);
            if(res.data.idToken){
                state.tokenID = res.data.idToken;
                state.user = res.data.email;
                localStorage.setItem("token", res.data.idToken);
                localStorage.setItem("name", res.data.email);

                const expiresSec = res.data.expiresIn;
                const now = new Date();
                const then = new Date(now.getTime() + (expiresSec * 1000));
                console.log(then);
                localStorage.setItem("expiresBy", then);

                store.dispatch('autoLogOut', expiresSec * 1000);
                router.push("/todo");
            }
        })
        .catch(error => 
            {
                console.log(error)
                
            })
    },

    loginUserFB(state, payLoad){
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJlQGZ4XlOfFN6CzY66tjlGEmyX0LmGHo", 
        {
            email: payLoad.email,
            password: payLoad.password,
            returnSecureToken: true
        })
        .then(res => {
            console.log(res.data.email);
            if(res.data.idToken){
                state.tokenID = res.data.idToken;
                state.user = res.data.email;
                localStorage.setItem("token", res.data.idToken);
                localStorage.setItem("name", res.data.email);

                const expiresSec = res.data.expiresIn;
                const now = new Date();
                const then = new Date(now.getTime() + (expiresSec * 1000));
                console.log(then);
                localStorage.setItem("expiresBy", then);

                store.dispatch('autoLogOut', expiresSec * 1000);
                router.push("/todo");
            }
        })
        .catch(error => 
            {
                console.log(error);
                swal({
                    title: "Error!",
                    text: "Please check your credentials!",
                    icon: "warning",
                    button: "Ok!",
                  });
            })
    },

    logoutUserFB(state){
        state.tokenID = "";
        state.user = "";
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("expiresBy");
        store.dispatch('emptyTodos');
        router.push("/");
        swal({
            title: "Success!",
            text: "You have been logged out!",
            icon: "success",
            button: "Ok!",
          });
    },

    autoLogin(state){
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");
        const exp = localStorage.getItem("expiresBy");
        const now = new Date();
        const then = new Date(exp);
        const diff = then.getTime() - now.getTime();

        if(token){
            if(now < then){
                state.tokenID = token;
                state.user = name;
                store.dispatch('autoLogOut', diff);
            }
            else{
                store.dispatch('logoutUserFB');
            }
        }
    },

    autoLogOut(state, payLoad){
        setTimeout(() => {
            store.dispatch('logoutUserFB');
        }, payLoad);
    }
};

const actions = {
    signupUserFB({commit}, payLoad){
        commit('signupUserFB', payLoad);
    },

    loginUserFB({commit}, payLoad){
        commit('loginUserFB', payLoad);
    },

    logoutUserFB({commit}){
        commit('logoutUserFB');
    },

    autoLogin({commit}){
        commit('autoLogin');
    },

    autoLogOut({commit}, payLoad){
        commit('autoLogOut', payLoad);
    }
};

const getters = {
    gettokenID(state){
        return state.tokenID;
    },
    
    getUser(state){
        return state.user;
    }
};

export default{
    state,
    mutations,
    actions,
    getters
}