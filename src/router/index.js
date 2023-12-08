import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
