import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import 'common/sass/index.scss'
Vue.config.productionTip = false
Fastclick.attach(document.body)

Vue.use(VueLazyload, {
    loading: require('common/images/default.png')
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
