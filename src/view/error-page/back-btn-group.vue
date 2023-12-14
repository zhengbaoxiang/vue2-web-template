<!--
 * @Date: 2021-10-09 09:35:17
 * @LastEditors: zbx
 * @LastEditTime: 2023-02-17 16:00:14
 * @FilePath: \frontCode\src\view\error-page\back-btn-group.vue
-->
<template>
  <div>
    <Button size="large" type="text" @click="backHome">返回首页({{ second }}s)</Button>
    <Button size="large" type="text" @click="backPrev">返回上一页</Button>
  </div>
</template>

<script>
export default {
  name: 'backBtnGroup',
  data () {
    return {
      second: 3,
      timer: null
    }
  },
  methods: {
    backHome () {
      this.$router.replace({
        name: this.$config.homeName
      })
    },
    backPrev () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backHome()
      else this.second--
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
