/**
 * 商品相关ajax函数
 */

import request from '@/utils/request'

// 获取商品分类列表
export const getCateList = (params) => {
    return request({
        method: 'get',
        url: '/goods/catelist',
        params
    })
}

// 修改分类
export const editCate = (data) => {
    return request({
        method: 'post',
        url: '/goods/editcate',
        data
    })
}

// 获取分类
export const getCateNames = () => {
    return request({
        method: 'get',
        url: '/goods/categories',
    })
}

// 添加商品
export const addGoods = (data) => {
    return request({
        method: 'post',
        url: '/goods/add',
        data
    })
}