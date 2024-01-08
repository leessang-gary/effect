<!-- https://juejin.cn/post/7226372265830449211 -->
<template>
  <div ref="canvasRef" class="scene-container"></div>
  
</template>
<script setup>
import { ref, reactive , onMounted } from "vue";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { GLTFLoader } from'three/examples/jsm/loaders/GLTFLoader.js'


const clock = new THREE.Clock();
const canvasRef = ref(null)
let container;
let camera, scene, renderer;
// const width = window.innerWidth / 2;
// const height = window.innerHeight / 2;
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
  const geometry = new THREE.BoxGeometry(10,10,10)
  // MeshBasicMaterial 不会受到光照影响
  // MeshLambertMaterial(漫反射网格材质) 会受到光照影响
  // const material = new THREE.MeshBasicMaterial({
  const material = new THREE.MeshPhongMaterial({
    color: 0xbbbbbb,
    transparent: true,
    opacity:.5,
  })

  // 循环创建 mesh
  // for(let i=0;i<10;i++){
  //   for(let j=0;j<10;j++){
  //     const mesh = new THREE.Mesh(geometry, material)
  //     mesh.position.set(i *20 ,0, j *20)
  //     scene.add(mesh); 
  //   }
  // }

  // 1.2.1 立方体
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(0,0,0)
  scene.add(mesh)

  // 1.2.2 gltf 模型
  const sheepLoader = new GLTFLoader();
  let sheep, mixer, action;
  sheepLoader.load('/src/assets/image/three/sheep/Sheep.gltf', gltf=>{
    sheep = gltf.scene;
    // 新建一个AnimationMixer, 并取得AnimationClip实例列表
    mixer = new THREE.AnimationMixer(sheep) //配合动画使用，稍作解释
    // 播放动画
    const clips = gltf.animations;
    // clips.forEach((clip) => {
    //   action = mixer.clipAction(clip);
    //   action.play();
    // });
    // 播放一个特定的动画
    const clip = THREE.AnimationClip.findByName( clips , 'Walk' );
    action = mixer.clipAction( clip );
    action.play()
    sheep.scale.set(5, 5, 5); // 调整大小
    sheep.position.set(0, 0, 0); // 调整位置
    scene.add(sheep) // 添加
  })
  // 创建曲线路径
  const points = [ 
    new THREE.Vector3(30, 11, -20), 
    new THREE.Vector3(30, 50, 20), 
    new THREE.Vector3(-30, 50, -20)
  ];
  const curve = new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.5); // 从 points 创建一条平滑的三维样条曲线。
  const newPoints = curve.getPoints(200); // 获取曲线的100个点 -- 数组
  
  // scene添加曲线轨迹 
  const geometry2 = new THREE.BufferGeometry().setFromPoints(newPoints); // 创建几何体
  const material2 = new THREE.LineBasicMaterial({ color: 0xff0000 }); // 创建材质
  const curveObject = new THREE.Line(geometry2, material2); // 绘制曲线
  scene.add(curveObject)



  // 1.3 添加辅助坐标系 - 红R (x)、绿G(y)、蓝B(z)
  const axesHelper = new THREE.AxesHelper(15)
  scene.add(axesHelper)

  // 1.4 添加光源 
  // 周围的，环境的(ambient)
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  // scene.add(ambientLight)
  // 点光源(PointLight)
  const pointLight = new THREE.PointLight(0xffffff, 2);
  pointLight.intensity = 1.0; //光照强度
  pointLight.decay = 0.0;//设置光源不随距离衰减
  pointLight.position.set(40, 20, 0)
  scene.add(pointLight)
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 10) // 光源辅助
  // scene.add(pointLightHelper)
  // scene.add(new THREE.GridHelper(100, 20));


  // 2. use 透视投影相机(PerspectiveCamera)
  camera = new THREE.PerspectiveCamera(30, width / height , 1, 3000);
  camera.position.set(100, 100, 100);
  camera.lookAt(10,0,0)
  // camera.lookAt(mesh.position)

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
    // console.log('camera.position',camera.position);
  })
  // controls.enable = true;
  // controls.minDistance = 300;
  // controls.maxDistance = 700;
  window.onresize = function(){
    // console.log(1)
    renderer.setSize( width , height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix(); //更新摄像机投影矩阵。在任何参数被改变以后必须被调用
  }

  render()
  // 简单旋转
  function render(){
    renderer.render(scene, camera)
    mesh.rotateY(0.01)
    requestAnimationFrame(render)
  }

  // handleGui(mesh, pointLight)
  // 创建一个GUI对象 调试界面
  function handleGui(mesh, pointLight) {
    const gui = new GUI();
    gui.add(mesh.position, 'x', 0, 180).name('模型x坐标').step(10).onChange(function(value){
      mesh.position.x = value
    })
    gui.add(pointLight, 'intensity', 0, 5).name('点光源光强度').step(0.1);
  }
  
  // palyAnimate()
  let startTime = 0;
  // 轨迹动画
  function palyAnimate() {
    renderer.render(scene, camera);
    const delta = clock.getDelta();
    mixer && mixer.update(delta);
    if (sheep && mixer) {
      // console.log(mixer)
      // 创建Follower
      let follower = new THREE.Object3D();
      scene.add(follower);
      
      const path = new THREE.Path(newPoints); // 将曲线转换成路径
      follower.position.copy(path.getPointAt(0));// 将follower的位置设置在初始位置
      follower.lookAt(path.getPointAt(0.1)); // 设定为朝向曲线路径的第二个点的方向
      scene.remove(sheep);// 删除原来的模型
      follower.add(sheep);// 将模型作为子元素添加到follower中 

      const curveLength = curve.getLength()
      const totalTime = curveLength / 1 // 这里的1是速度
      startTime += 1;
      const moveTime = startTime % totalTime;
      let distance = (moveTime * 1) % curveLength; //应该移动的距离
      if((distance + 0.1)> curveLength) distance = 0; //getPointAt 参数范围是[0,1] 
      // console.log(distance, curveLength)
      // debugger
      const sheepPosition = curve.getPointAt(distance / curveLength)//获取follower应该在曲线上的位置
      follower.position.copy(sheepPosition); // 更新follower的位置
      const lookAhead = 0.1; // 指定follower朝向曲线路径前方的距离（可根据需要调整）
      
      const target = curve.getPointAt((distance + lookAhead) / curveLength); // 获取follower朝向的目标点
      follower.lookAt(target); // 更新follower的朝向
    }
    requestAnimationFrame(palyAnimate);  
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
