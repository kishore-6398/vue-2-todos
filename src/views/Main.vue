<template>
    <div class="container mb-5">
        <app-Navbar></app-Navbar>
        <app-Form></app-Form>
        <app-Todos></app-Todos>
    </div>
</template>

<script>
import Form from './Form.vue'
import Todos from './Todos.vue'
import Navbar from './Navbar.vue'

export default {
    components: {
        'app-Form': Form,
        'app-Todos': Todos,
        'app-Navbar': Navbar
    }    
}
</script>

<style scoped>

</style>