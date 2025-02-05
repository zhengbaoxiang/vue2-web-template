/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String }  显示在侧边栏、面包屑和标签栏的文字
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  useCache: (false) 设为true后页面在切换标签后会缓存，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
import Main from '@/components/layout/main.vue'

export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            hideInMenu: true,
            hideInBread: true,
        },
        component: () => import('@/view/login/login.vue')
    },
    {
        path: '/',
        name: '_home',
        component: Main,
        redirect: '/home',
        meta: {
            title: '首页',
            useCache: true,
            hideInBread: true
        },
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页'
                },
                component: () => import('@/view/home/HomeView2.vue'),

            }
        ]

    },
    {
        path: '/system',
        name: 'system',
        component: Main,
        meta: {
            title: '系统管理',
            access: ['admin']
        },
        children: [
            {
                path: 'user',
                name: 'user',
                meta: {
                    title: '用户管理'
                },
                component: () => import('@/view/system/user.vue')
            }
        ]
    },
    {
        path: '/template',
        name: 'template',
        component: Main,
        meta: {
            title: '模板管理',
            access: ['admin']
        },
        children: [
            {
                path: 'iview_template',
                name: 'iview_template',
                meta: {
                    title: 'iview模板页',
                },
                component: () => import(/* webpackChunkName: "page_template_iview" */  '@/view/template_iview.vue')
            },
            {
                path: 'element_template',
                name: 'element_template',
                meta: {
                    title: 'Element模板页',
                },
                component: () => import(/* webpackChunkName: "page_template_ele" */ '@/view/template_ele.vue')
            },
        ]
    },

    {
        path: '/about',
        name: 'about',
        meta: {
            title: '关于',
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "page_about" */ '@/view/AboutView.vue')
    },

    {
        path: '/401',
        name: 'error_401',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/401.vue')
    },
    {
        path: '/500',
        name: 'error_500',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/500.vue')
    },
    {
        path: '*',
        name: 'error_404',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/404.vue')
    },
]