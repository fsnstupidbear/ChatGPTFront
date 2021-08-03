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

// 富文本编辑器
import tinymce from 'tinymce'
import VueTinymce from '@packy-tang/vue-tinymce'
//样式
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.min.css'
//主题
import 'tinymce/themes/silver'
// 扩展插件
import 'tinymce/plugins/link' //链接插件
import 'tinymce/plugins/image' //图片插件
import 'tinymce/plugins/media' //媒体插件
import 'tinymce/plugins/table' //表格插件
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/quickbars' //快速栏插件
import 'tinymce/plugins/fullscreen' //全屏插件
import 'tinymce/icons/default'
// 引入中文包，本地化
import '../public/tinymce/zh_CN.js'
Vue.prototype.$tinymce = tinymce;
Vue.use(VueTinymce);

//引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
