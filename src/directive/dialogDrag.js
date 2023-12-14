/*
 * @Date: 2023-12-08 11:19:29
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-14 16:47:42
 * @descript: 文件描述
 */
import Vue from 'vue'

// v-dialogDrag: 弹窗拖拽属性 （重点！！！ 给模态框添加这个属性模态框就能拖拽了）
/**
 * 拖拽指令 v-dialogDrag="options"
 * options = {
 *  trigger: /这里传入作为拖拽触发器的CSS选择器/   .el-dialog__header,
 *  body:    /这里传入需要移动容器的CSS选择器/,   '.el-dialog'
 *  recover: false  /拖动结束之后是否恢复到原来的位置/
 * }
 */

Vue.directive('dialogDrag', { // 属性名称dialogDrag，前面加v- 使用
    bind(el, binding, vnode) {
        // console.log('-binding>', binding)
        const trigger = binding.value && binding.value.trigger
        const body = binding.value && binding.value.body
        const dialogHeaderEl = el.querySelector(trigger || '.el-dialog__header')
        const dragDom = el.querySelector(body || '.el-dialog')
        dialogHeaderEl.style.cssText += ';cursor:move;'
        dragDom.style.cssText += ';top:0px;'

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const getStyle = (function () {
            if (window.document.currentStyle) {
                return (dom, attr) => dom.currentStyle[attr]
            } else {
                return (dom, attr) => getComputedStyle(dom, false)[attr]
            }
        })()

        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft
            const disY = e.clientY - dialogHeaderEl.offsetTop

            const dragDomWidth = dragDom.offsetWidth
            const dragDomHeight = dragDom.offsetHeight

            const screenWidth = document.body.clientWidth
            const screenHeight = document.body.clientHeight

            const minDragDomLeft = dragDom.offsetLeft
            const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

            const minDragDomTop = dragDom.offsetTop
            const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight
            // const maxDragDomTop = screenHeight - dragDom.offsetTop// 不需要-dragDomHeight

            // 获取到的值带px 正则匹配替换
            let styL = getStyle(dragDom, 'left')
            let styT = getStyle(dragDom, 'top')

            if (styL.includes('%')) {
                styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
                styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
            } else {
                styL = +styL.replace(/\px/g, '')
                styT = +styT.replace(/\px/g, '')
            }

            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离
                let left = e.clientX - disX
                let top = e.clientY - disY

                // 边界处理
                if (-(left) > minDragDomLeft) {
                    left = -minDragDomLeft
                } else if (left > maxDragDomLeft) {
                    left = maxDragDomLeft
                }

                if (-(top) > minDragDomTop) {
                    top = -minDragDomTop
                } else if (top > maxDragDomTop) {
                    top = maxDragDomTop
                }

                // 移动当前元素
                dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`

                // emit onDrag event
                vnode.child.$emit('dragDialog')
            }

            document.onmouseup = function (e) {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
})


