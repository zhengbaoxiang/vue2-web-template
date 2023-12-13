/*
 * @Date: 2023-12-13 16:44:17
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-13 16:57:04
 * @descript: 文件描述
 */
import axios from './axios'; // 自定义的axios 实例
import config from '@/config';
import store from '@/store';

import { Modal, Message, Notice } from 'view-design'; // 弹窗消息提示组件

// 针对单个业务线重新封装一层函数  request 名称随意,传参为调用axios时的options
const request = (opts) => {
    // 为了在组件内 拿到 异步的数据返回，需要使用promise 包一层
    return new Promise((resolve, reject) => {
        axios.request(opts).then((res) => {
                if (res.data && res.data.code) {
                    let code = res.data.code; // 每个项目code都不一样，甚至data的字段也不一样
                    if (code == 200) {
                        resolve(res.data);
                    } else if (code == 202) {
                        // 未登录，或者登录状态已失效时，清空token，
                        const url = `${config.loginUrl}`;
                        store.commit('setToken', '');
                        // 使用提示
                        Message.error(res.data.msg || '登录已过期');
                        setTimeout(() => {
                            window.location.href = url;
                        }, 1000);
                        reject(res.data);
                    } else {
                        // 其它业务错误，直接提示消息
                        Message.error(res.data.msg || '接口逻辑错误');
                        reject(res.data);
                    }
                } else {
                    resolve(res); //接口通了，但是没有code,则认为导出下载的二进制流
                }
            })
            .catch((err) => {
                Message.error('接口未知异常');
                reject({
                    code: '999',
                    msg: opts.msg || '请求失败，请重试',
                    data: err,
                });
            });
    });
};

export default request;


// 封装另一个业务线mAxios2接口对应的调用函数
export const request2 = (opts) => {
    return new Promise((resolve, reject) => {
        mAxios2.request(options)
            .then((res) => {
            })
            .catch((err) => {
            })
    });
};

//在api文件中，使用上述封装的方法
// import request from '@/libs/request'
export const login = (data) => {
    return request({
        url: '/system/login',
        data,
        method: 'post',
    });
};
// 在组件中 login.vue
// login()