/*
 * @Date: 2023-12-07 09:45:12
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-12 15:59:39
 * @descript: 文件描述
 */
const { defineConfig } = require('@vue/cli-service')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}

const isTest = process.env.VUE_APP_ENV === "testing"
// 分析打包大小使用默认配置  
let plugins = isTest ? [
    new BundleAnalyzerPlugin()
] : []
const DateString = (new Date().getMonth() + 1) + '-' + new Date().getDate() + '_' + new Date().getHours() + new Date().getMinutes()

const BASE_URL = process.env.VUE_APP_PUBLIC_PATH


module.exports = defineConfig({
    publicPath: BASE_URL,
    transpileDependencies: true,
    productionSourceMap: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    },
    configureWebpack: {
        plugins: plugins,
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
            // filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
            filename: `js/[name]_${DateString}_f.js`,       // 此选项决定了每个输出 bundle 的名称
            chunkFilename: `js/[name]_${DateString}_com.js` // 此选项决定了非初始（non-initial）chunk 文件的名称 ；比如路由加载组件
        },
        optimization: {
            splitChunks: {
               // 这表明将选择哪些 chunk 进行优化。当提供一个字符串，有效值为 all，async 和 initial。
               // 设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享。
                chunks: 'async', 
                minSize: 5*1024,
                // minRemainingSize: 0,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 5,
                enforceSizeThreshold: 50000,
                cacheGroups: {
                    // 默认配置之后，自定义
                    element: {
                        name: "element-ui",
                        test: /[\\/]element-ui[\\/]/,
                        priority: 20,
                        reuseExistingChunk: true,
                    },
                    iView: {
                        name: "iView",
                        test: /[\\/]view-design[\\/]/,
                        priority: 20,
                        reuseExistingChunk: true,
                    },
                    default: {
                        name: 'common', // 打包后的文件名
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                        chunks: 'all',
                    },
                    defaultVendors: {
                        name: 'vendors-default',
                        test: /[\\/]node_modules[\\/]/,
                        priority: -20,
                        reuseExistingChunk: true,
                        chunks: 'async',
                    },
                  
                }
            }
        }
    },
    devServer: {
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 8022, // 默认8080
        open: true,  // 自动打开浏览器
        // https: false,
    }
})
