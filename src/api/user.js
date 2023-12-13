/*
 * @Date: 2023-12-13 16:37:54
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-13 16:55:06
 * @descript: 文件描述
 */
import request from '@/api/request'

// 登录
export const login = data => {
    return request({
        url: '/sys/login',
        data,
        method: 'post'
    })
}
// 获取用户信息,鉴权接口
export const getUserAuth = params => {
    return request({
        url: '/sys/getUserAuth',
        params,
        method: 'get'
    })
}
// 登出
export const logout = params => {
    return request({
        url: '/sys/logout',
        params,
        method: 'get'
    });
}

