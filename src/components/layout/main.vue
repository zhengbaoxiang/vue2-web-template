<!--
 * @Date: 2023-12-14 09:40:41
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-14 15:54:36
 * @descript: 文件描述
-->
<template>
	<Layout style="height: 100%" class="main">
		<Header style="background: #fff" class="header">
			<HeaderBar>
				<div class="logo">
					<!-- <img :src="12" alt="" class="sideLogo" /> -->
					<p class="projTitle">xx项目</p>
				</div>
			</HeaderBar>
		</Header>
		<Layout>
			<Sider
				style="background: #fff"
				class="left-sider"
				:collapsible="false"
				:width="210"
				:collapsed-width="50"
				v-model="collapsed"
			>
				<sider-menu :menu-list="menuList" 
                @on-select="turnToPage"> </sider-menu>
			</Sider>
			<Content class="layout-content">
				<keep-alive :include="cacheList">
					<router-view></router-view>
				</keep-alive>
			</Content>
		</Layout>
	</Layout>
</template>
<script>
import SiderMenu from "./siderMenu";
import HeaderBar from "./header";
import "./main.less";

import { mapMutations, mapActions, mapGetters, mapState } from "vuex";

export default {
	components: {
		SiderMenu,
		HeaderBar,
	},
	computed: {
		...mapGetters(["menuList"]),
		...mapState({
			menuList2: (state) => state.app.menuList,
		}),
		cacheList() {
			// 从路由过滤，或者写死
			let list = ["home"];
			return list;
		},
	},
	data() {
		return {
			collapsed: false,
		};
	},
	mounted() {
		this.generateMenuList();
	},
	methods: {
		...mapMutations(["setMenuList", "setBreadCrumb"]),
		...mapActions(["generateMenuList"]),

        turnToPage(route) {
            let { name, params, query } = {};
            if (typeof route === "string") name = route;
            else {
                name = route.name;
                params = route.params;
                query = route.query;
            }
            
            if (name.indexOf("isTurnByHref_") > -1) {
                window.open(name.split("_")[1]);
                return;
            }
            if (name === this.$route.name) {
                console.log("路由重复:", name);
                return;
            }
            this.$router.push({
                name,
                params,
                query,
            });
        },
	},
};
</script>
