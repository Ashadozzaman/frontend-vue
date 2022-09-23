import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
window.toastr = require('toastr')
import './assets/scss/app.scss'
require("bootstrap")
import 'bootstrap/dist/css/bootstrap.css'

createApp(App).use(store).use(router).mount('#app')
