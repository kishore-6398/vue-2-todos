<template>
    <div class="sticky-top">
        <b-navbar toggleable="lg" type="dark" style="background-color: #7952b3">
            <img src="../assets/todo.png" alt="todo" style="width: 60px; height: 50px; margin-right: 2px">
            <b-navbar-brand>TodosApp</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item><b-icon icon="person-circle"></b-icon> <span style="color: white">{{ getUser }}</span></b-nav-item>
                <b-nav-item @click="logoutUser"><b-icon icon="power" aria-hidden="true"></b-icon> <span style="color: white">LogOut</span></b-nav-item>        
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'getUser'
        ])
    },
    methods: {
        ...mapActions([
            'logoutUserFB'
        ]),
        logoutUser(){
            this.logoutUserFB();
        }
    }
}
</script>

<style scoped>
.b-nav-link{
    color: rgb(228, 22, 22);
}
</style>