<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <NavbarVue/>
  <router-view/>
  <MyFooter/>
</template>
<script>
  import NavbarVue from './components/NavbarVue.vue';
  import MyFooter from './components/MyFooter.vue';

 export default {
  components: {NavbarVue,MyFooter}
 }
</script>

<style lang="scss">
</style>
