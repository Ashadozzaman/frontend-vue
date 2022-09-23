// import { createStore } from "vuex";
// import * as Vue from 'vue'
import Vuex from "vuex";
import axios from "axios";

// Vue.use(Vuex)
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("accessToken") || null,
  },
  getters: {
    loggedIn(state){
      return state.token !== null
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    removeToken(state) {
      state.token = null;
    },
  },
  actions: {
    login(context, credential) {
      return new Promise( (resolve,reject) => {
        axios
          .post("/login", {
            email: credential.email,
            password: credential.password,
          })
          .then((res) => {
            let access_token = res.data.access_token;
            localStorage.setItem("accessToken", access_token);
            context.commit("setToken", access_token);
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    register(context,credential){
      return new Promise((resolve,reject) => {
        axios.post('/register',{
          name: credential.name,
          email: credential.email,
          password: credential.password,
          password_confirmation: credential.password_confirmation,
        }).then((res) => {
            let access_token = res.data.access_token;
            localStorage.setItem("accessToken", access_token);
            context.commit("setToken", access_token);
            resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
      })
    },
    
    logout(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token 
      return new Promise( (resolve,reject) => {
        axios
          .post("/logout").then((res) => {
            localStorage.removeItem("accessToken");
            context.commit("removeToken");
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    
    course(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token 
      return new Promise( (resolve,reject) => {
        axios
          .get("/course").then((res) => {
            console.log(res);
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    
    course_checkout(context,id) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token 
      return new Promise( (resolve,reject) => {
        axios
          .get('/checkout/',{ params:{id:id} }).then((res) => {
            // console.log(res.data);
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    
    coupon_submit(context, credential) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token 
      return new Promise( (resolve,reject) => {
        axios
          .post("/checkout", {
            coupon: credential.coupon,
            id: credential.course_id,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    
    checkout_submit(context, credential) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token 
      return new Promise( (resolve,reject) => {
        axios
          .post("/checkout/submit", {
            coupon: credential.coupon_code,
            price:  credential.final_price,
            course_id: credential.course_id,
          })
          .then((res) => {
            resolve(res.data);
            console.log(res.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

  },
  modules: {},
});
