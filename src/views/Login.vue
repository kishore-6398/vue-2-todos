<template>
    <div class="row m-0" >
        <div class="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2">
            <div class="card shadow" style="margin-top: 35px">
                <div class="card-body py-0 px-0">
                    <div class="text-center">
                        <img src="../assets/silo.png"  />
                        <h4 class="my-3">Todo Login</h4>
                    </div>
                    <div class="pb-4 px-5">
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-control mb-2" v-model="$v.loginData.email.$model" />
                            <div v-if="$v.loginData.email.$dirty">
                                <p v-if="!$v.loginData.email.required">Email is required!</p>
                                <p v-if="!$v.loginData.email.email">Enter valid email!</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control mb-2" v-model="$v.loginData.password.$model" />
                            <div v-if="$v.loginData.password.$dirty">
                                <p v-if="!$v.loginData.password.required">Password is required!</p>
                                <p v-if="!$v.loginData.password.minlen">Password should be atleast 8 characters long!</p>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col">
                                <router-link to="/signup" class="btn btn-link">Signup</router-link>
                            </div>
                            <div class="col">
                                <button class="btn btn-secondary btn-block" @click="loginUser">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
export default {
    data(){
        return{
            loginData: {
                email: "",
                password: ""
            }
        }
    },
    validations: {
        loginData: {
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
            'loginUserFB'
        ]),
        loginUser(){
            this.$v.$touch();
            if(!this.$v.$error){
                this.loginUserFB(this.loginData);
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