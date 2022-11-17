import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router/router'
import './assets/css/global.css'
import './plugins/element'
import store from './store'
import './assets/iconfont/iconfont.css'

axios.defaults.baseURL = 'http://127.0.0.1:3007'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
