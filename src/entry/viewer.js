import Vue from 'vue'

import Viewer from '../components/Viewer.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(Viewer)
})
