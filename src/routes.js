import Vue from 'vue'

import Home from './components/public/home.vue'
let routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/home', component: Home, name: 'home' }
]

export default routes
