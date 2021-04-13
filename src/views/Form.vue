<template>
<div class="row">
    <div class="col-lg-4 d-none d-sm-none d-md-none d-lg-block mt-4">
        <div class="card">
            <div class="card-body">
                <h5 class="text-center">Welcome to TodosApp!!!</h5>
                <div class="font-weight-bold"><i>Create, edit, delete, search, filter and manage your todos.</i></div>
                <div class="font-weight-bold"><i>Mark a todo 'complete' by just a click.</i></div>
            </div>
        </div>
    </div>
    <div class="col-lg-8 mt-4">
        <div class="card shadow">
            <div class="card-body px-5 pt-md-5 pb-md-3">
                <div class="form-group row">
                    <label class="col-lg-3 col-md-3 h5 mb-3">Create a new Todo</label>
                    <div class="col-lg-6 col-md-6 mb-3">
                        <input class="form-control" type="text" v-model="$v.todo.$model" placeholder="Add some todos" />
                    </div>
                    <div class="col-lg-3 col-md-3">
                        <button class="btn btn-primary btn-block" :disabled="$v.$invalid" @click="addTodo">Add Todo</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
    data(){
        return{
            todo: ""
        }
    },
    validations: {
        todo: {
            required
        }
    },
    methods:{
        ...mapActions([
            'addTodoToDb'
        ]),
        addTodo(){
            this.addTodoToDb({todoContent: this.todo});
            this.todo = "";
        }
    }
}
</script>

<style scoped>

</style>