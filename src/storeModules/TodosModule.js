import axios from 'axios';
import swal from 'sweetalert';
import AuthModule from './AuthModule'

const state = {
    todosArray: [],
};

const mutations = {
    addTodoToDb(state, {getters, payLoad}){
        const val = {
            "content": payLoad.todoContent,
            "completed": false,
            "dat": new Date()
        };

        const auth = getters.gettokenID;
        const u = getters.getUser;
        const user = u.substring(0, u.indexOf('@'));
        console.log(user);
        axios.post("https://todosapp-30d2c.firebaseio.com/" + user + "/todos.json?auth=" + auth, val)
        .then(res => {
            if(res.data){
                val.key = res.data.name;
                state.todosArray.splice(0, 0, val);
            }
        })
        .catch(error => console.log(error));
    },
    
    getTodoFromDb(state, getters){
        
        const auth = getters.gettokenID;
        const u = getters.getUser;
        const user = u.substring(0, u.indexOf('@'));
        console.log(user);
        axios.get("https://todosapp-30d2c.firebaseio.com/" + user + "/todos.json?auth="+auth)
        .then(res => {
            if(res.data != null){
                var keys = Object.keys(res.data);
                var jsonArr = Object.values(res.data);
                for(var i=0; i<keys.length; i++){
                    jsonArr[i].key = keys[i];
                }
                state.todosArray = jsonArr.reverse();
            }   
        })
        .catch(error => console.log(error));
    },

    deleteTodoFromDb(state, {getters, payLoad}){
        const auth = getters.gettokenID;
        const u = getters.getUser;
        const user = u.substring(0, u.indexOf('@'));
        console.log(user);
        swal({
            title: "Delete Todo",
            text: "Are you sure you want to delete the todo?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete("https://todosapp-30d2c.firebaseio.com/" + user + "/todos/" + payLoad.todo.key + ".json?auth=" + auth)
                .then(res => {
                    if(res.data == null){
                        const index = state.todosArray.indexOf(payLoad.todo);
                        state.todosArray.splice(index, 1);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
                swal("Your todo has been deleted!", {
                icon: "success",
              });
            } 
          });
    },

    updateTodoInDb(state, {getters, payLoad}){
        const auth = getters.gettokenID;
        const u = getters.getUser;
        const user = u.substring(0, u.indexOf('@'));
        console.log(user);

        axios.put("https://todosapp-30d2c.firebaseio.com/" + user + "/todos/" + payLoad.key + ".json?auth=" + auth, payLoad)
        .then(res => {
            if(res.data){
                const obj = state.todosArray.find(temp => {
                    return temp.key === payLoad.key;
                });
               
                obj.content = payLoad.content;
                obj.completed = payLoad.completed;
                swal({
                    
                    text: "Your todo has been updated!",
                    icon: "success",
                    button: "Ok!",
                });
            }
        })
        .catch(error => {
            consolelog(error);
        });
    },

    emptyTodos(state){
        state.todosArray = [];
    }
};

const actions ={
    addTodoToDb({commit, getters}, payLoad){
        commit('addTodoToDb', {getters, payLoad}); 
    },

    getTodoFromDb({commit, getters}){
        commit('getTodoFromDb', getters);
    },

    deleteTodoFromDb({commit, getters}, payLoad){
        commit('deleteTodoFromDb', {getters, payLoad});
    },

    updateTodoInDb({commit, getters}, payLoad){
        commit('updateTodoInDb', {getters, payLoad});
    },

    emptyTodos({commit}){
        commit('emptyTodos');
    }
};

const getters = {
    getTodosArray(state){
        return state.todosArray;
    }
};

export default{
    state,
    mutations,
    actions,
    getters
}