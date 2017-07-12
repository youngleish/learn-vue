import Vue from 'vue'
import VueRouter from 'vue-router'

import goods from 'views/goods/goods.vue'
import seller from 'views/seller/seller.vue'
import rating from 'views/rating/rating.vue'

Vue.use(VueRouter)
const routes = [
    {
        path: '/goods',
        component: goods
    },
    {
        path: '/seller',
        component: seller
    },
    {
        path: '/rating',
        component: rating
    },
    {
        path: '*',
        redirect: '/goods'
    }
]

const router = new VueRouter({
    routes,
    linkActiveClass: 'active'
})

export {router}
