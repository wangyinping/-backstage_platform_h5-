// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './element-variables.scss'
import App from './App'
import router from './router'
import '@/css/reset.scss'
import request from '@/request'

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
request.attach(new Vue({
  el: '#app', // 提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标
  router,
  components: {App},
  template: '<App/>', // 模板将会替换挂载的元素,挂载元素的内容都将被忽略
  data: {
    Bus: new Vue()
  }
}))
