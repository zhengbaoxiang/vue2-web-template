/*
 * @Date: 2023-12-07 09:45:12
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-08 13:48:53
 * @descript: 文件描述
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入自定义指令
import  '@/directive'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI)


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './index.less';

console.log('-env>',process.env)



Vue.use(ElementUI);



Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
