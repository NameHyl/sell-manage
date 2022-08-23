import Vue from 'vue'
import App from './App.vue'
import router from './router'

// reset.css 重置样式
import "@/assets/css/reset.css"
// iconfont.css
import '@/assets/fonts/iconfont.css'
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import local from '@/utils/local'

Vue.use(ElementUI);

// 自定义指令
Vue.directive('premission', {
  inserted: function (el, data) {
    if (!data.value.includes(local.get('role'))) {
      el.remove()
    }
  }
})

// bus中介
Vue.prototype.$bus = new Vue;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
