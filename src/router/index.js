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
      },
      {
        path: '/DivideGroupContest',
        name: 'DivideGroupContest',
        component: () => import('../views/tool/DivideGroupContest.vue')
      },
      {
        path: '/TopEightDoubleElimination',
        name: 'TopEightDoubleElimination',
        component: () => import('../views/topEightDoubleElimination/TopEightDoubleElimination.vue')
      },
    ]
  },
  {
    path: '/DivideGroupTool',
    name: 'DivideGroupContest',
    component: () => import('../views/tool/DivideGroupContest.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
