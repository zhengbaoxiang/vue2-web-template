/*
 * @Date: 2023-11-20 13:12:05
 * @LastEditors: zbx
 * @LastEditTime: 2023-11-20 14:21:26
 * @descript: 文件描述
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: '0.0.0.0',
    port: 8020, // 默认8080
    open: true,  // 自动打开浏览器
    // https: false,
  }
})
