import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import SingerDetail from 'components/singer-detail/index'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/rank',
            name: 'Rank',
            component: Rank
        },
        {
            path: '/recommend',
            name: 'Recommend',
            component: Recommend,
            children: [
                {
                    path: ':id',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/search',
            name: 'Search',
            component: Search
        },
        {
            path: '/singer',
            name: 'Singer',
            component: Singer,
            children: [
                {
                    path: ':id',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/',
            redirect: '/recommend'
        }
    ]
})
