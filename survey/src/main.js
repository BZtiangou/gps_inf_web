import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import '@/svgImage/iconFront/iconfont.css'
// 注册一下上面三个组件作为全局组件
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
