/**
 * 订单相关ajax函数
 */

import request from '@/utils/request'

// 获取订单列表
export const getOrderList = (params) => {
    return request({
        method: 'get',
        url: '/order/list',
        params
    })
}

// 获取首页数据
export const getHomeData = (params) => {
    return request({
        method: 'get',
        url: '/order/totaldata',
        params
    })
}
