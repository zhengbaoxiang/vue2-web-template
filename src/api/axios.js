/*
 * @Date: 2023-12-13 16:48:52
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-13 16:56:28
 * @descript: 文件描述
 */
import axios from 'axios';
import config from '@/config';
import { getToken } from '@/libs/util'

class HttpRequest {
  constructor(baseUrl) {
    this.baseURL = baseUrl;
  }
  getInsideConfig() {
    // 自定义的配置
    const config = {
      baseURL: this.baseUrl,
      headers: {
        token: getToken(),
      },
      withCredentials: true,
    };
    return config;
  }
  // 自定义拦截器
  interceptors(instance, url) {
    instance.interceptors.request.use(
      (config) => {
        // 此处可以对配置动态修改，但是我们挪到一个getInsideConfig方法了，
        // 在创建实例时就混入配置，避免接口的单独配置被此处拦截器覆盖
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        // status 200的
        // 此处可以对接口成功的响应拦截，根据 response.data中的返回，做不同的处理 如code200表示正常,或status 1 表示正常
        // 由于业务逻辑不同，为降低代码耦合性，将此处的逻辑抽离出去，在request.js中单独处理
        return response;
      },
      (err) => {
        // status 非200,接口不通的
        return Promise.reject(err);
      }
    );
  }
  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options); // 将自定义配置与传入的配置整合
    this.interceptors(instance, options.url); // 给axios 实例单独增加拦截器，非全局
    return instance(options); // 返回实例调用的结果，是一个promise对象。约等于 axios(options)
  }
}

const myAxios = new HttpRequest(config.baseUrl);
export default myAxios;

// 封装另一个业务线接口对应的调用函数
export const mAxios2 = new HttpRequest(config.IMApiUrl)
