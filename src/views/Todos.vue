<template>
    <div class="mt-5">
        <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                <select class="form-control mb-sm-5 mb-3 " v-model="show" style="width: 100%">
                    <option v-for="opt in options" :key="opt">{{ opt }}</option>
                </select>
            </div>
            <div class="col-lg-3 offset-lg-6 col-md-4 offset-md-4 col-sm-6 col-12">
                <input type="search" class="form-control mb-4" style="width: 100%" placeholder="search todos" v-model="search" />
            </div>
        </div>

        <div class="row" v-if="bool">
            <app-ITodo v-for="todo in filteredTodos" :key="todo.key" :todo = "todo"></app-ITodo>
        </div>

        <!-- Spinner -->
        <div class="text-center" v-else>
            <div class="spinner-border text-primary mb-1" role="status"></div>
            <div class="h6"><i>Fetching Todos</i></div>
        </div>
    </div>
</template>

<script>
import ITodo from './ITodo.vue';
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';

export default {  
     data(){
        return{
            show: "All Todos",
            options: ["All Todos", "Completed", "Not Completed"],
            search: "",
            bool: false
        }
    },
    methods: {
        ...mapActions([
            'getTodoFromDb'
        ])
    },
    computed: {
        ...mapGetters([
            'getTodosArray',
        ]),
        filteredTodos(){
            if(this.show == "All Todos"){
                return this.getTodosArray.filter(temp => {
                    return temp.content.toLowerCase().match(this.search.toLowerCase());
                });
            }
            else if(this.show == "Completed"){
                return this.getTodosArray.filter(temp => {
                    return temp.completed === true && temp.content.toLowerCase().match(this.search.toLowerCase());
                });
            }
            else if(this.show == "Not Completed"){
                return this.getTodosArray.filter(temp => {
                    return temp.completed === false && temp.content.toLowerCase().match(this.search.toLowerCase());
                });
            }
        }
    },
    components: {
        'app-ITodo': ITodo
    },
    mounted(){
        setTimeout(() => {
            //const auth = this.$store.getters.gettokenID;
            this.getTodoFromDb();
            this.bool = !this.bool;
        }, 2000);
    }
}
</script>

<style scoped>

</style>