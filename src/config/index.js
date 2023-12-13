/*
 * @Date: 2023-12-13 09:59:57
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-13 10:23:07
 * @descript: 文件描述
 */
export default {
    title: '后台管理项目',

    // 默认打开的首页的路由name值，默认为home
    homeName: "home",

    // 服务器配置路径
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    // 接口请求路径前缀
    baseUrl: process.env.VUE_APP_BASE_APIURL,


    loginUrl:`${location.host + process.env.VUE_APP_PUBLIC_PATH}login`







}