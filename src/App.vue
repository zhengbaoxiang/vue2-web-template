<!--
 * @Date: 2023-12-07 09:45:12
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-14 10:09:44
 * @descript: 文件描述
-->
<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
    height: 100%;
	nav {
		padding: 30px;
        text-align: center;

		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
}
</style>
