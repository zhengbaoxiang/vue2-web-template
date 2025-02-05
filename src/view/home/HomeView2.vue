<!--
 * @Date: 2023-12-13 17:36:18
 * @LastEditors: zbx
 * @LastEditTime: 2025-02-05 16:19:06
 * @descript: 文件描述
-->
<template>
    <div class="home" style="text-align:center">
        <canvas id="canvasId" style="background: black;" width="800" height="800"></canvas>
    </div>
</template>

<script>
// @ is an alias to /src
import * as THREE from 'three';

export default {
    name: 'HomeView',
    data() {
        return {
            scene: null,
            camera: null,
            renderer: null
        }
    },
    mounted() {
        this.initThreeJS();
    },
    methods: {
        initThreeJS() {
            // 创建3D场景对象Scene
            const scene = new THREE.Scene();
            //1. 长方体形状
            const geometry = new THREE.BoxGeometry(100, 100, 100);
            //2. 长方体材质
            //MeshBasicMaterial不受光照影响, 默认颜色为白色
            // const material = new THREE.MeshBasicMaterial({
            //     color: 0x0000ff,
            // });
            // 漫反射网格材质
            const material = new THREE.MeshLambertMaterial();

            //3. 长方体网格模型Mesh
            const mesh = new THREE.Mesh(geometry, material);
            //4. 长方体添加到虚拟场景中
            scene.add(mesh);

            // 平行光
            const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
            // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
            directionalLight.position.set(80, 100, 50);
            // directionalLight.position.set(100, 0, 0);
            // directionalLight.position.set(0, 100, 0);
            // directionalLight.position.set(100, 100, 100);

            // 方向光默认指向xyz坐标原点
            scene.add(directionalLight);


            // 实例化一个透视投影相机对象
            const camera = new THREE.PerspectiveCamera();

            //相机在Three.js三维坐标系中的位置
            // 根据需要设置相机位置具体值
            camera.position.set(200, 200, 200);


            //相机观察目标指向Threejs 3D空间中某个位置
            camera.lookAt(0, 0, 0); //坐标原点


            // 创建渲染器对象
            const canvas = document.getElementById('canvasId');
            const renderer = new THREE.WebGLRenderer({
                canvas: canvas//渲染结果输出画布：canvas
            });

            // 画布背景设置成灰色
            renderer.setClearColor(0x999999);

            //执行渲染操作
            // renderer.render(scene, camera); 


            // 渲染函数
            function render() {
                renderer.render(scene, camera); //执行渲染操作
                mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
                requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
            }
            render();

        }

    }
}
</script>