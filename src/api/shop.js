/**
 * 店铺相关ajax函数
 */

import request from '@/utils/request'

// 获取店铺数据
export const getShopInfo = () => {
    return request({
        method: 'get',
        url: '/shop/info',
    })
}

// 保存店铺数据
export const editShop = (data) => {
    return request({
        method: 'post',
        url: '/shop/edit',
        data
    })
}