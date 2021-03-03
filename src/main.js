import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './theme/index.css'
import ElementUI from 'element-ui'
import './assets/css/global.css'
import VueWechatTitle from 'vue-wechat-title';
import axios from 'axios'

Vue.use(VueWechatTitle)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

axios.defaults.withCredentials = true
