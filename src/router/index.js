/*
 * @Date: 2023-12-07 09:45:12
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-14 16:46:13
 * @descript: 文件描述
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

import config from '@/config'
import { getToken,setToken ,setSession,hasPermission} from '@/libs/util'

import store from '@/store'

const { homeName, title } = config
const loginName = 'login'


Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: config.publicPath,
    routes
})

router.beforeEach((to, from, next) => {
    // console.log('to', to)
    const token = to.query.token || getToken()

    if (!token && to.name === loginName) {
        next()
    } else if (!token && to.name !== loginName) {
        // 可以在此缓存初始链接，登陆后，回调这个页面,todo
        setSession('lastUrl',location.href)
        next({ name: loginName })
    } else if (token && to.name == loginName) {
        next({ name: homeName })
    }else{
        setToken(token)
        store.dispatch('getUserInfo').then(access =>{
            // 判断有无当前页面权限
            permissionHook(to,access, next)
        }).catch((err)=>{
            // 报错就回到登录页
            // next({ name: loginName })
        })
    }
    next()
})


// 权限点处理
const permissionHook = (to, access, next) => {
    if (hasPermission(to,access)) {
        next()
    } else {
        // 无权限，重定向到401页面
        next({ replace: true, name: 'error_401' })
    }
}


router.afterEach((to) => {
    window.scrollTo(0, 0)
    setTitle(to, router.app)
})
// 设置标题
const setTitle = (to, vm) => {
    const pageTitle = to.meta && to.meta.title
    const resTitle = pageTitle ? `${title} - ${pageTitle}` : title
    window.document.title = resTitle
}

export default router
