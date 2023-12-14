<!--
 * @Date: 2023-12-14 10:35:15
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-14 16:57:09
 * @descript: 文件描述
-->
<template>
	<div class="menuWrapper">
		<slot></slot>
		<Menu
			ref="menu"
			theme="light"
			width="auto"
			:mode="mode"
			:active-name="activeName"
			:open-names="openedNames"
			:accordion="accordion"
			@on-select="handleSelect"
			@on-open-change="openChange"
		>
            <template v-for="item in menuList">
                <template v-if="hasChild(item)">
                    <Submenu  :name="getNameOrHref(item)" :key="`menu-${item.name}`">
                        <template slot="title">
                            <!-- <common-icon :type="item.icon || ''" /> -->
                            <span>{{showTitle(item)}}</span>
                        </template>

                        <template  v-for="subItem in item.children" >
                            <menu-item :name="getNameOrHref(subItem)" :key="`submenu-${subItem.name}`" >
                                {{showTitle(subItem)}}
                            </menu-item>
                        </template>
                    </Submenu>
                    
                </template>
                <template v-else>
                    <menu-item :name="getNameOrHref(item)" :key="`menu-${item.name}`">
                        <!-- <common-icon :type="item.icon || ''" /> -->
                        <span>{{showTitle(item)}}</span>
                    </menu-item>
                </template>
            </template>
		</Menu>
	</div>
</template>

<script>
import mixin from "./mixin";
export default {
	name: "SideMenu",
	mixins: [mixin],
	props: {
		menuList: {
			type: Array,
			default() {
				return [];
			},
		},
		mode: {
			type: String,
			default: "vertical", // horizontal
		},
		accordion: {
			type: Boolean,
			default: false,
		},
		activeName: {
			type: String,
			default: "",
		},
		openNames: {
			type: Array,
			default: () => [],
		},
	},
	computed: {},
    data(){
        return {
            openedNames:[]
        }
    },
	methods: {
		handleSelect(name) {
			this.$emit("on-select", name);
		},
        openChange(names) {
			this.openedNames = names;
		},
	},
};
</script>

<style>
</style>

