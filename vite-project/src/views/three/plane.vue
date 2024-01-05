<!-- https://juejin.cn/post/7226372265830449211 -->
<template>
  <div ref="canvasRef" class="scene-container"></div>
  
</template>
<script setup>
import { ref, reactive , onMounted } from "vue";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 
const canvasRef = ref(null)
let container;
let camera, scene, renderer;
const width = window.innerWidth / 2;
const height = window.innerHeight / 2;
function init(){
  // dom获取需要放到挂载之后
  container = canvasRef.value;
  // 使用 透视相机 camera
  camera = new THREE.PerspectiveCamera(60, width / height , 1, 100000);
  camera.position.set(10, 100, -10);

  // 获取 材料
  const cubeLoader = new THREE.CubeTextureLoader();
  cubeLoader.setPath('/src/assets/image/three/plane/')
  const textureCube = cubeLoader.load([
    'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'
  ])

  // 使用 场景 scene
  scene = new THREE.Scene();
	scene.background = textureCube;

  // 添加光源 ambient 周围的，环境的
  const ambientLight = new THREE.AmbientLight(0xfff000, 3.5);
  scene.add(ambientLight)

  // const pointLight = new THREE.PointLight(0xffffff, 5);
  // pointLight.position.set(-400, 1000, 100)
  // scene.add(pointLight)

  // scene.add(new THREE.GridHelper(800, 20));

  // 渲染 renderer
  renderer = new THREE.WebGLRenderer({
    antialias : true, //  抗锯齿
  }); 
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize( width, height);
  renderer.render(scene, camera);
  container.appendChild( renderer.domElement );
  
  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.enable = false;
  // controls.minDistance = 300;
  // controls.maxDistance = 700;
  // window.addEventListener('resize', onWindowResize)
  // function onWindowResize() {
  //   camera.aspect = ( width / height);
  //   camera.updateProjectionMatrix(); //更新摄像机投影矩阵。在任何参数被改变以后必须被调用。
  //   renderer.setSize( width , height);
  // }

}
onMounted(() => {
  init()
})

</script>

<style lang="scss" scoped>
.scene-container {
  // background-color: #000;
}
</style>
