import Vue from 'vue'

import Analyze from '../components/Analyze.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(Analyze)
})
