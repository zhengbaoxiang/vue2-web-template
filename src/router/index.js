/*
 * @Date: 2023-12-07 09:45:12
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-22 17:29:27
 * @descript: 文件描述
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'


import { getToken,setToken ,setSession,hasPermission} from '@/libs/util'
import store from '@/store'
import config from '@/config'

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
            // 报错回到登录页？还是404，还是不处理,token需要清空
            // setToken('123321')
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

/**
 *  * 完整的导航解析流程
    导航被触发。
    在失活的组件里调用 beforeRouteLeave 守卫。
    调用全局的 beforeEach 守卫。
    在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
    在路由配置里调用 beforeEnter。
    解析异步路由组件。
    在被激活的组件里调用 beforeRouteEnter。
    调用全局的 beforeResolve 守卫 (2.5+)。
    导航被确认。
    调用全局的 afterEach 钩子。
    触发 DOM 更新。
    调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
*/