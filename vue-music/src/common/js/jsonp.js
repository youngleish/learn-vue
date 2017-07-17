/**
 * Created by young on 2017/7/17.
 * https://github.com/webmodules/jsonp/blob/master/Readme.md
 * @param url  不带参数的服务端地址
 * @param data  url传递的参数
 * @param opts   jsonp库需要传递的参数
 */
import originJsonp from 'jsonp'

export default function jsonp (url, data, opts) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + handleParam(data)
    return new Promise((resolve, reject) => {
        originJsonp(url, opts, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

function handleParam(obj) {
    let str = ''
    for (let key in obj) {
        let val = obj[key] !== undefined ? obj[key] : ''
        str += `&${key}=${encodeURIComponent(val)}`
    }
    return str ? str.substring(1) : ''
}
