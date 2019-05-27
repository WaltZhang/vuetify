import Vue from 'vue'
import App from './App.vue'
import joint from 'jointjs'

Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$joint', { value: joint });

new Vue({
  render: h => h(App),
}).$mount('#app')
