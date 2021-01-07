// import Vue from 'vue'
import Vue from 'vue';
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'lib-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import '../src/styles/base.css'
import '../src/styles/iconfont.css'
import axios from 'axios'
import DoInput from './components/DoInput.vue'
import DoBtn from './components/DoBtn'
import DoNav from './components/DoNav.vue'
import DoHeader from './components/DoHeader.vue'
import moment from 'moment'
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import 'videojs-contrib-hls' 
import { getRequest, postRequest } from './api/request'
const hls = require('videojs-contrib-hls')
Vue.component('DoInput', DoInput)
Vue.component('DoBtn', DoBtn)
Vue.component('DoNav', DoNav)
Vue.component('DoHeader', DoHeader)
// 隐藏提示铭文
Vue.config.productionTip = false
// axios全局定义
Vue.prototype.$axios = axios
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
// axios.defaults.baseURL = 'https://m.jlszyy.cc'
// 请求拦截器-响应
// axios.interceptors.response.use(function (response) {
//   if (response.data.statusCode === 401 && response.data.message === '用户信息验证失败') {
//     router.push('/login')
//     localStorage.removeItem('token')
//     localStorage.removeItem('user_id')
//     Vant.$toast.fail('获取用户信息错误')
//   }
//   return response
// }, function (error) {
//   return Promise.reject(error)
// })
// // 请求拦截器-请求
// axios.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('token')
//   if (token) {
//     config.headers.Authorization = token
//   }
//   return config
// })
// 时间过滤器
Vue.filter('time', function (input) {
  return moment(input).format('YYYY-MM-DD')
})
Vue.use(Vant)
Vue.use(VideoPlayer)
Vue.use(hls)
// createApp(App).use(router).mount('#app')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
