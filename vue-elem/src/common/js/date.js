export function formatDate(date, fmt) {
    // 替换年份
    let year = date.getFullYear() + ''
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, year)
    }

    let obj = {
        'M+': date.getMonth() + 1,
        'd+': date.getDay(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let key in obj) {
        if (new RegExp(`(${key})`).test(fmt)) {
            let str = obj[key] + ''
            fmt = fmt.replace(RegExp.$1, addLeftZero(str))
        }
    }
    return fmt
}

function addLeftZero(num) {
    return ('00' + num).substr(num.length)
}
