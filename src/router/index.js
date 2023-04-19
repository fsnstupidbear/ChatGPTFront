import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta:{title:"SPbPU-ChatGPT"}
  },
  {
    path: '/main',
    name:'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/Chat',
        name: 'Chat',
        component: () => import('../views/Chat/Chat.vue'),
        meta:{title:"SPbPU-ChatGPT"}
      },
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/Welcome.vue'),
        meta:{title:"SPbPU ChatGPT——欢迎回来！"}
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('../views/user/Users.vue'),
        meta:{title:"SPbPU——用户管理"}
      },
      {
        path: '/roleAdmin',
        name: 'roleAdmin',
        component: () => import('../views/user/RoleAdmin.vue'),
        meta:{title:"SPbPU——角色管理"}
      },

      {
        path: '/ApiAdmin',
        name: 'ApiAdmin',
        component: () => import('../views/user/ApiAdmin.vue'),
        meta:{title:"SPbPU——API管理"}
      },
    ],
    meta:{title:"Polytechnic University ChatGPT"}
  },
]

const router = new VueRouter({
  routes
})

export default router
