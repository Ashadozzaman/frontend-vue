<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container">
      <router-link class="nav-link" :to="{name:'about'}" >
        <img src="../assets/logo.png" width="80" alt="">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'home'}" >Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'about'}" >About</router-link>
          </li>
          <li class="nav-item" v-if="loggedIn">
            <router-link class="nav-link" :to="{name:'course'}" >Course</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              User
            </a>
            <ul class="dropdown-menu">
              <li v-if="!loggedIn"><router-link class="dropdown-item" :to="{name:'login'}" >Login</router-link></li>
              <li v-if="!loggedIn"><router-link class="dropdown-item" :to="{name:'register'}">Register</router-link></li>
              <li v-if="loggedIn"><router-link class="dropdown-item" :to="{name:'logout'}">Logout</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarVue",
  created() {},
  data() {
    return {};
  },
  computed:{
    loggedIn(){
      return this.$store.getters.loggedIn
    }
  }
};
</script>

<style lang="scss" scoped></style>