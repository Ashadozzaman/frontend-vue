<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <label>User Registration Page</label>
          </div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  aria-describedby="nameHelp"
                  v-model="credential.name"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  name="email"
                  v-model="credential.email"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="credential.password"/>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="password_confirmation" v-model="credential.password_confirmation"/>
              </div>
              <div class="text-end">
                <button type="submit" class="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr';

export default {
  name: "RegisterView",
  created() {},
  data() {
    return {
      credential:{
        name:'Ashadozzaman',
        email:'admin@gmail.com',
        password:null,
        password_confirmation:null
      }
    };
  },
  props: {},
  methods: {
    register(){
      this.$store.dispatch('register',this.credential).then(res => {
        toastr.success(res.message)
        this.$router.push({
          name:'home'
        })
      }).catch(error=>{
        toastr.error(error.response.data.message);
      })
    }
  },
};
</script>

<style lang="scss" scoped></style>