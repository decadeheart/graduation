import Vue from 'vue'

import Detail from '../components/Detail.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(Detail)
})