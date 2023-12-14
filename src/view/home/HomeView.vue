<!--
 * @Date: 2023-12-07 09:45:12
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-14 10:31:22
 * @descript: 文件描述
-->
<template>
  <div class="home"  style="text-align:center">
    <img alt="Vue logo" src="@/assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
