/*
 * @Date: 2021-10-09 09:35:16
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-14 16:58:58
 * @FilePath: \frontCode\src\components\main\components\side-menu\mixin.js
 */
// import CommonIcon from '_c/common-icon'
export default {
    components: {
        // CommonIcon
    },
    methods: {
        showTitle(item) {
            // return showTitle(item, this)
            return item.meta.title || item.name
        },
        hasChild(item) {
            return item.children && (item.children.length > 0 )
        },
        showChildren(item) {
            return item.children && (item.children.length > 1)
        },
        getNameOrHref(item, children0 = false) {
            return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name)
        }
    }
}
