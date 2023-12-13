/*
 * @Date: 2023-12-13 10:18:50
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-13 15:54:35
 * @descript: 文件描述
 */
import HomeView from '../views/HomeView.vue'


export default [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/iview_template',
      name: 'iview_template',
      component: () => import(/* webpackChunkName: "page_template_iview" */  '../views/template_iview.vue')
    },
    {
      path: '/element_template',
      name: 'element_template',
      component: () => import(/* webpackChunkName: "page_template_ele" */ '../views/template_ele.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "page_about" */ '../views/AboutView.vue')
    },
  ]