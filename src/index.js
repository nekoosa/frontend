import Vue from 'vue'
import App from './App.vue'
import routes from './routes.js'
import VueRouter from 'vue-router'
import './assets/css/global.css'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})

Vue.use(VueRouter)

window.router = router

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
