<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Main from './views/Main.vue'
export default {
   components: {
        'app-Main': Main
    }
}
</script>

<style>

</style>
