import { createRouter, createWebHashHistory } from 'vue-router'
import register from '../views/register.vue'
import login from '../views/login.vue'
import home from '../views/home/Home.vue'
const routes = [
    //重定向
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: login
      },
  {
    path: '/register',
    name: 'Register',
    component: register
  },
  {
    path: '/home',
    name: 'Home',
    component: home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router