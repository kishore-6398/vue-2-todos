<template>
    <div class="col-lg-4 col-md-6 col-12">
       <div class="card mb-3" @mouseover="hover = true" @mouseleave="hover=false" :class="{ shadow: hover }" style="height: auto; transition: 0.5s">
           <div class="card-header bg-white" >
               <div class="float-left">
                    <span><b-icon icon="calendar-3" aria-hidden="true"></b-icon> {{ todo.dat | dateFilter }}</span>
                </div>
               <img src="../assets/Green-tick.png" v-if="todo.completed" @click="completed" class="float-right" style="height: 35px; width: 50px; cursor: pointer"/>
               <img src="../assets/xx.png" v-if="!todo.completed" @click="completed" class="float-right" style="height: 35px; width: 40px; cursor: pointer"/>
           </div>
           <div class="card-body" >
               {{ todo.content }}
           </div>
           <div class="card-footer bg-white">
                
                <div class="float-right">
                    <button class="btn btn-sm btn-secondary" data-toggle="modal" :data-target="'#exampleModal' + todo.key"><b-icon icon="pen-fill" aria-hidden="true"></b-icon></button>
                    <button class="btn btn-sm btn-danger" @click="deleteTodo"><b-icon icon="trash-fill" aria-hidden="true"></b-icon></button>
                </div>
           </div>
       </div>

        <!--Update Modal-->
       <div class="modal fade" :id="'exampleModal' + temptodo.key" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit & Update Todo</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body px-5">
                        <div class="form-group">
                            <label class="h5">Todo</label>
                            <input type="text" v-model="$v.temptodo.content.$model" class="form-control"/>
                            <div v-if="$v.temptodo.content.$dirty">
                                <p v-if="!$v.temptodo.content.required" class="text-danger mt-1" >You cannot have an empty todo.</p>
                            </div>
                            <br>
                            <div class="form-check form-check-inline">
                                <label class="form-check-label font-weight-bold" :for="'todoCheck' + temptodo.key">Completed Todo</label>
                                <input class="form-check-input ml-2" type="checkbox" :id="'todoCheck' + temptodo.key" v-model="temptodo.completed">
                            </div>

                            <!-- <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" :name="'inlineRadioOptions' + todo.key" :id="'todoCheck1' + todo.key" v-model="todo.completed" value="true">
                                <label class="form-check-label" :for="'todoCheck1' + todo.key">Yes</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" :name="'inlineRadioOptions' + todo.key" :id="'todoCheck2' + todo.key" v-model="todo.completed" value="false">
                                <label class="form-check-label" :for="'todoCheck2' + todo.key">No</label>
                            </div> -->
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"><b-icon icon="x-square" aria-hidden="true"></b-icon> Close</button>
                        <button type="button" class="btn btn-success" @click="updateTodo"><b-icon icon="box-arrow-up" aria-hidden="true"></b-icon> Update Todo</button>
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
    props: ['todo'],
    data(){
        return{
           hover: false,
           temptodo: Object.assign({}, this.todo)
        }
    },
    validations: {
        temptodo: {
            content:{
                required
            }   
        }
    },
    methods: {
        ...mapActions([
            'deleteTodoFromDb',
            'updateTodoInDb'
        ]),
        deleteTodo(){
            this.deleteTodoFromDb({ todo: this.todo, currentPage: this.currentPage });
        },
        updateTodo(){
            this.$v.$touch();
            if(!this.$v.$error){
                this.updateTodoInDb(this.temptodo);
                $('#exampleModal' + this.temptodo.key).modal("hide");
            }
        },
        completed(){
            this.todo.completed = !this.todo.completed;
            this.updateTodoInDb(this.todo);
        }
    },
    filters: {
        dateFilter(val){
            const d = new Date(val);
            const day = d.getDate();
            const m = d.getMonth();
            const year = d.getFullYear();
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = months[m];
            return day + ' ' + month + ' ' + year;
        }
    }
}
</script>

<style scoped>
  
</style>