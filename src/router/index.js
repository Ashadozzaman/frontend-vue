import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CourseView from '../views/CourseView.vue'
import LoginView from '../views/LoginView.vue'
import LogoutPage from '../components/LogoutPage.vue'
import RegisterView from '../views/RegisterView.vue'
import CourseCheckout from '../views/CourseCheckout.vue'

import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/course',
    name: 'course',
    component: CourseView,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta:{
      visitor: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta:{
      visitor: true
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutPage,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/course',
    name: 'course',
    component: CourseView,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/checkout/:id',
    name: 'course.checkout',
    component: CourseCheckout,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/checkout/submit',
    name: 'submit.checkout',
    component: CourseCheckout,
    meta:{
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from,next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name:'login'
      })
    }else{
      next();
    }
  }else if(to.matched.some(record => record.meta.visitor)){
    if (store.getters.loggedIn) {
      next({
        name:'home'
      })
    }else{
      next();
    }
  }else{
    next();
  }
})

export default router
