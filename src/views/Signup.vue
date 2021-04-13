<template>
    <div class="row m-0" >
        <div class="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2">
            <div class="card shadow" style="margin-top: 30px">
                <div class="card-body py-0 px-0">
                    <div class="text-center">
                        <img src="../assets/silo.png"  />
                        <h4 class="my-3">Todo Signup</h4>
                    </div>
                    <div class="pb-4 px-5">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model="$v.signupData.name.$model" />
                            <div v-if="$v.signupData.name.$dirty">
                                <p v-if="!$v.signupData.name.required">Name is required!</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-control" v-model="$v.signupData.email.$model" />
                            <div v-if="$v.signupData.email.$dirty">
                                <p v-if="!$v.signupData.email.required">Email is required!</p>
                                <p v-if="!$v.signupData.email.email">Enter valid email!</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" v-model="$v.signupData.password.$model" />
                            <div v-if="$v.signupData.password.$dirty">
                                <p v-if="!$v.signupData.password.required">Password is required!</p>
                                <p v-if="!$v.signupData.password.minlen">Password should be atleast 8 characters long!</p>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col">
                                <router-link to="/" class="btn btn-link">Login</router-link>
                            </div>
                            <div class="col">
                                <button class="btn btn-success btn-block" @click="signupUser">Signup</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { required, email, minLength } from 'vuelidate/lib/validators';
export default {
    data(){
        return{
            signupData: {
                name: "",
                email: "",
                password: ""
            }
        }
    },
    validations: {
        signupData: {
            name: {
                required
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minlen: minLength(8)
            }
        }
    },
    methods: {
        ...mapActions([
            'signupUserFB'
        ]),
        signupUser(){
            this.$v.$touch();
            if(!this.$v.$error){
                this.signupUserFB(this.signupData);
            }
        }
    }
}
</script>

<style scoped>

    img{
        width: 100%;
        height: 150px;
        object-fit: cover;
    }
    label{
        font-weight: bold;
    }
    p{
        color: rgb(37, 102, 224);
        font-weight: bold;
    }
</style>