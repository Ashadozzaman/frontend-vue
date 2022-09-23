<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <label>User Login Page</label>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
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
  name: "LoginView",
  created() {},
  data() {
    return {
      credential:{
        email:'admin@gmail.com',
        password:'password'
      }
    };
  },
  props: {},
  methods: {
    login(){
      this.$store.dispatch('login',this.credential).then(res => {
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

<style>
.login-form {
  border: 1px solid gainsboro;
  border-radius: 4px;
}
.toast-message{
  color: red;
  font-weight: bold;
}
</style>
