<script lang="ts">
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";
import LoginLayout from "./views/LoginLayout.vue";


export default {
  components: {
    NavBar,
    SideBar,
    LoginLayout
  },
};
</script>

<template>
  <div id="app">
   <router-view />
    <main></main>
  </div>
</template>

<style scoped></style>

<!-- TEST COMMITA-->
