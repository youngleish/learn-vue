/**
 * Created by young on 2017/10/29.
 */
import jsonp from 'common/js/jsonp'
import {comParams, options} from './config'
export function getRecommend () {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = Object.assign({}, comParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })

    return jsonp(url, data, options)
}
