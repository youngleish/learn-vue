/**
 * Created by young on 2017/11/26.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'  // 通过mutation修改state的时候会在控制台打印一条记录state修改前的值和修改后的值

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug, // 检测state的修改是否来源于commit mutations 如果不是会报警告……`
    plugins: debug ? [createLogger()] : []
})
