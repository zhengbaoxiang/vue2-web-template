/*
 * @Date: 2023-12-07 09:45:12
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-13 16:18:18
 * @descript: 文件描述
 */
import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,app
  }
})
