<template>
  <div ref="canvasRef" class="scene-container"></div>
</template>
<script setup>
import { ref, reactive , onMounted } from "vue";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'


const clock = new THREE.Clock();
const canvasRef = ref(null)
let container;
let camera, scene, renderer;
const width = 800;
const height = 500
function init(){
  // dom获取需要放到挂载之后
  container = canvasRef.value;

  // 1. use 场景(scene)
  scene = new THREE.Scene();

  // 1.1 纹理(贴图)(texture)
  const cubeLoader = new THREE.CubeTextureLoader();
  cubeLoader.setPath('/src/assets/image/three/sheep/')
  const textureCube = cubeLoader.load([
    'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'
  ])
	// scene.background = textureCube;

  // 1.2 网格模型(Mesh) = 几何体(Geometry) + 材质(Material) 

  const material = new THREE.LineBasicMaterial({
    color: 0x0000ff ,
  })

  const points = []
  points.push(new THREE.Vector3(-10,0,0))
  points.push(new THREE.Vector3(0,10,0))
  points.push(new THREE.Vector3(10,0,0))
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  const line = new THREE.Line( lineGeometry, material)
  line.position.set(0,0,0)
  scene.add(line)
  
  const loader = new FontLoader();
  loader.load( '/src/assets/font/helvetiker_regular.typeface.json', function ( font ) {
    const textGeometry = new TextGeometry( 'Hello world', {
      font: font,
      size: 10,
      height: 1,
      curveSegments: 1,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1
    } );
    const text = new THREE.Mesh( textGeometry, material );
    scene.add( text )

  });


  //  添加辅助坐标系 - 红R (x)、绿G(y)、蓝B(z)
  const axesHelper = new THREE.AxesHelper(15)
  scene.add(axesHelper)

  // 添加光源 
  // 周围的，环境的(ambient)
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight)
  


  // 2. use 透视投影相机(PerspectiveCamera)
  camera = new THREE.PerspectiveCamera(30, width / height , 1, 3000);
  camera.position.set(100, 100, 100);
  camera.lookAt(10,0,0)
  camera.lookAt(line.position)

  // 3. use 渲染器(renderer) 
  renderer = new THREE.WebGLRenderer({
    antialias : true, //  抗锯齿
  }); 
  renderer.setPixelRatio(window.devicePixelRatio);
  // 设置canvas尺寸
  renderer.setSize( width, height);
  // 渲染
  renderer.render(scene, camera);

  // 添加到HTML中
  container.appendChild( renderer.domElement );
  

  // 4. use 相机控件(OrbitControls)
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change',function(){
    renderer.render(scene, camera)
  })
  controls.enable = true;

  render()
  // 简单旋转
  function render(){
    renderer.render(scene, camera)
  }
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
