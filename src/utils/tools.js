/**
 * 工具函数
 */

// 验证账号
export const isAccount = (val) => {
    return /^[\u4E00-\u9FA5a-zA-Z0-9]{3,12}$/.test(val)
}

// 验证密码
export const isPassword = (val) => {
    return /^[a-zA-Z0-9_-]{6,12}$/.test(val)
}

export const padZero = (n) => {
    return n < 10 ? '0' + n : n;
}

// 转换时间格式
export const normalizeDate = (time, s = '-') => {
    let date = new Date(time)

    let y = date.getFullYear()
    let m = date.getMonth() + 1;
    let d = date.getDate()

    return [y, m, d].map(v => padZero(v)).join(s)
}
