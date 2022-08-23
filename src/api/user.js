/**
 * 用户相关ajax函数
 */
import request from '@/utils/request'

// 登录
export const checkLogin = (data) => {
    return request({
        method: 'post',
        url: '/users/checkLogin',
        data
    })
}

// 添加账号
export const addAccount = (data) => {
    return request({
        method: 'post',
        url: '/users/add',
        data
    })
}

// 获取账号列表
export const getAccountList = (params) => {
    return request({
        method: 'get',
        url: '/users/list',
        params
    })
}

// 删除账号
export const deleteAccount = (id) => {
    return request({
        method: 'get',
        url: '/users/del',
        params: {
            id,
        }
    })
}

// 批量删除
export const batchDel = (ids) => {
    return request({
        method: 'get',
        url: '/users/batchdel',
        params: {
            ids
        }
    })
}

// 修改账号
export const editAccount = (data) => {
    return request({
        method: 'post',
        url: '/users/edit',
        data
    })
}

// 检查旧密码是否正确

// 修改密码

// 获取个人信息
export const getInfo = () => {
    return request({
        method: 'get',
        url: '/users/info',
    })
}

// 修改用户头像
export const editAvatar = (imgUrl) => {
    return request({
        method: 'get',
        url: '/users/avataredit',
        params: {
            imgUrl
        }
    })
}
