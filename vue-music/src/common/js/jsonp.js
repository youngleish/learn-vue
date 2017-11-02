/**
 * Created by young on 2017/7/17.
 * https://github.com/webmodules/jsonp/blob/master/Readme.md
 * @param url  不带参数的服务端地址
 * @param data  url传递的参数
 * @param opts  jsonp库需要传递的参数
 */
import originJsonp from 'jsonp'

export default function jsonp(url, data, opt) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + handleUrlParam(data)
    return new Promise((resolve, reject) => {
        originJsonp(url, opt, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

function handleUrlParam(data) {
    let url = ''
    for (var key in data) {
        let val = data[key] !== undefined ? data[key] : ''
        url += `&${key}=${decodeURIComponent(val)}`
    }
    return url ? url.substring(1) : ''
}
