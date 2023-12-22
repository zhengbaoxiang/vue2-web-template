<!--
 * @Date: 2023-12-13 17:36:05
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-22 17:39:30
 * @descript: 文件描述
-->
<template>
	<div>
		<Button @click="toLogin" type="primary" class="ml10">登录</Button>
	</div>
</template>

<script>
import { setToken, getToken, setLocal, getLocal } from "@/libs/util";
import { mapActions, mapState ,mapGetters} from "vuex";

export default {
	methods: {
		...mapActions(["login"]),
		toLogin() {
			this.login().then((res) => {
				this.$message("登录成功");
				this.$router.push("/");
			});
		},
	},
};
</script>

<style>
</style>