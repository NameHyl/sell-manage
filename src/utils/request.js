/**
 * ajax封装
 */
import axios from 'axios'
import { Message } from 'element-ui';  // this.$message ==== Message
import local from '@/utils/local'

axios.defaults.baseURL = 'http://127.0.0.1:5000'; // 默认ajax请求服务器路径
axios.defaults.timeout = 10000; // 请求超时时间

// 请求拦截器
axios.interceptors.request.use((config) => {
    // config是请求配置对象
    let token = local.get('t_k')

    // 请求头统一携带token
    if (token) {
        config.headers.Authorization = token
    }

    return config;
}, (err) => {
    return Promise.reject(err)
})


// 响应拦截器
axios.interceptors.response.use((response) => {
    // resposne后端响应的数据
    let res = response.data;

    // 统一处理状态码
    if (res.code === 0) {
        Message({
            type: 'success',
            message: res.msg
        })
    }

    if (res.code === 1 || res.code === 5001) {
        Message.error(res.msg)
    }

    if (res.code === 401) {
        Message.error(res.msg + ',请重新登录')
        window.location.href = 'http://localhost:8080/#/login'  // 跳转到登录页面
    }

    return response;
}, (err) => {
    console.log('err>>>', err)
    return Promise.reject(err)
})

// 暴露出去
export default axios;
