import Vue from 'vue'

import Articles from './components/public/markdown.vue'
let routes = [
  { path: '/', component: Articles, name: 'home' },
  { path: '/resources', component: Articles, name: 'home' }
]

export default routes
