import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/main',
    name:'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/users',
        name: 'Users',
        component: () => import('../views/user/Users.vue')
      },
      {
        path: '/signUpContest',
        name: 'SignUpContest',
        component: () => import('../views/user/SignUpContest.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
