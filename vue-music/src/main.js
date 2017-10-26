import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Fastclick from 'fastclick'

import 'common/sass/index.scss'
Vue.config.productionTip = false
Fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
