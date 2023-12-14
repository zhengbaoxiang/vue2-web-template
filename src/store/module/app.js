/*
 * @Date: 2023-12-13 16:17:30
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-14 14:59:22
 * @descript: 文件描述
 */
import {    getMenuByRoutes,} from '@/libs/util'
import routers from '@/router/routes'

export default {
    state: {
        menuList: [],
    },
    getters: {
        menuList: (state, getters, rootState) => {
            // return getMenuByRoutes(routers, rootState.user.access)
            return state.menuList
        },
    },
    mutations: {
        setMenuList(state, list) {
            state.menuList = list;
        },
        setBreadCrumb(state, list) {
            state.breadCrumbList = list
        },
    },
    actions: {
        generateMenuList({ commit, rootState }) {
            let menuList = getMenuByRoutes(routers, rootState.user.access);
            console.log('-menuList>', menuList)
            commit('setMenuList', menuList);
        },

    }

}