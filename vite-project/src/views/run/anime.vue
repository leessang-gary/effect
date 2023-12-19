<!-- https://animejs.com/documentation/#lineDrawing -->
<template>
  <!-- 单个例子 -->
  <div ref="apple" class="apple" ></div>
  <!-- 多个例子 -->
  <div class="table">
    <div ref="table" class="small square el" :key="item" v-for="(item) in list"></div>
  </div>
  <!-- 数字对象 -->
  <div ref="nums" class="nums">{{ _kudi }}</div>
  <!-- SVG对象 -->
  <div ref="moveIcon" class="moveIcon"></div>
  <div class="svg">
    <svg ref="svg" width="200" height="200">
      <g fill="none" stroke="#000000" stroke-width="2" stroke-dasharray="1">
        <path ref="path" stroke-dashoffset="2" d="M88.43,81.14a6,6,0,0,1-.35,1.7,1.77,1.77,0,0,1-1.25.9,11.38,11.38,0,0,1-3,.3c-1.36,0-3.28,0-5.75-.1-1.4-.07-2.55-.15-3.45-.25a11.92,11.92,0,0,1-2.4-.5,7.45,7.45,0,0,1-2.05-1.1,20.74,20.74,0,0,1-2.2-2q-2.59-2.61-4.65-4.9c-1.36-1.54-2.7-3.15-4-4.85s-2.65-3.59-4.05-5.65-3-4.54-4.8-7.4A13.29,13.29,0,0,0,47,53.94a28.48,28.48,0,0,0-4.75-2.75,20.75,20.75,0,0,0-4.9-1.6,9,9,0,0,0-3.9-.05q-1.29,2-2.4,3.65c-.73,1.1-1.67,2.51-2.8,4.25a8.52,8.52,0,0,0,1.55.55l1.9.45q1,.2,1.8.3a3.48,3.48,0,0,0,1.15,0q1.5-.3,2.4-.45a6.53,6.53,0,0,1,1.6-.1,8.28,8.28,0,0,1,1.35.2c.44.1,1,.25,1.65.45a14,14,0,0,1,5.25,2.9,7.13,7.13,0,0,1,1.95,4.9,2.05,2.05,0,0,1-1,1.9,4.33,4.33,0,0,1-3.2.5,16.88,16.88,0,0,0-7.05.9q-4.35,1.29-10.65,3.8-3.7,1.4-4.45,1.2c-.5-.14.09-.84,1.75-2.1,1.07-.8,2-1.52,2.8-2.15s1.5-1.24,2.1-1.8l1.65-1.55c.5-.47,1-1,1.55-1.5a23.19,23.19,0,0,0-2-3.9,15.42,15.42,0,0,0-2.9-3.4q-2,3.6-3.55,6.25c-1,1.76-2,3.35-3,4.75a34.92,34.92,0,0,1-3,3.8,43.57,43.57,0,0,1-3.55,3.45C13,78,11.46,79.2,9.73,80.54S6,83.4,3.63,85.14a3.86,3.86,0,0,1-2.75,1.1c-.7-.14-1-.77-.85-1.9a9.39,9.39,0,0,1,1.35-4.25c.7-1,1.39-1.39,2.05-1,.14.06.77-.44,1.9-1.5s2.45-2.45,3.95-4.15,3-3.57,4.6-5.6a51.54,51.54,0,0,0,3.95-5.85q1.8-3.11,3.75-6.3t4.25-6.75q2.3-3.55,5.05-7.4c1.83-2.57,3.89-5.35,6.15-8.35a2.93,2.93,0,0,0,.5-1.5c0-.47-.4-1.1-1.2-1.9-.47-.47-.47-.84,0-1.1s1.53-.24,3.2.1a9,9,0,0,1,4.55,2.2,4.88,4.88,0,0,1,1.65,3.6,4.3,4.3,0,0,1-.45,2.1,6.45,6.45,0,0,1-1.85,1.8,22.38,22.38,0,0,0-5,4.7,25.26,25.26,0,0,1,8,2.9,35.58,35.58,0,0,1,8.75,7.1q5.81,6,10.2,9.9a61.11,61.11,0,0,0,8.3,6.3q5.5,3.3,8.55,5.15a40.07,40.07,0,0,1,4.45,3,5,5,0,0,1,1.65,1.9A4.09,4.09,0,0,1,88.43,81.14Zm-71.5,3.2c.34-1.87.78-2.92,1.35-3.15s.92,0,1,.85a1.34,1.34,0,0,0,.7.85,3.61,3.61,0,0,0,2.1.15A43.12,43.12,0,0,0,27.58,82c2-.5,3.8-1,5.5-1.6s3.13-1.09,4.3-1.55a10.39,10.39,0,0,0,1.95-.9c1.2-1.2,2.13-2.09,2.8-2.65a3.71,3.71,0,0,1,2.5-.85,9.2,9.2,0,0,1,3.1.65,14.58,14.58,0,0,1,3.5,1.85,7.76,7.76,0,0,1,3,3.35,2.36,2.36,0,0,1-.3,2.75,4.83,4.83,0,0,0-1.1,1.65q-.6,1.25-1.2,2.7c-.4,1-.77,1.88-1.1,2.75s-.57,1.46-.7,1.8c-.4,1.4-.91,3-1.55,4.65s-1.32,3.36-2.05,5a45,45,0,0,1-2.35,4.55,10.84,10.84,0,0,1-2.55,3.1c-1.06.8-1.93,1-2.6.65S37.5,108.24,37,106a15.86,15.86,0,0,1-.55-3.4,3.34,3.34,0,0,1,1.15-1.9,10.93,10.93,0,0,0,2.2-3.25,33.08,33.08,0,0,0,1.9-4.8A43.06,43.06,0,0,0,43,87.79a14.14,14.14,0,0,0,.35-3.55,39.18,39.18,0,0,1-6,2.75q-3.39,1.24-6.5,2.15t-5.45,1.35a11.85,11.85,0,0,1-2.85.35,12,12,0,0,1-3.4-1,4.81,4.81,0,0,1-1.75-1.5,3.86,3.86,0,0,1-.6-1.85A9.54,9.54,0,0,1,16.93,84.34Z"></path>
      </g>
    </svg>
  </div>
</template>
<script setup>
import anime from 'animejs/lib/anime.es.js';
import { ref, reactive , onMounted } from "vue";
const list = [1,2,3,4,5,6,7,8,9,10]
// 定义获取DOM
const apple = ref(null);
const table = ref(null);
const nums = ref(null);

const moveIcon = ref(null);
const svg = ref(null);
const path = ref(null);
// 定义数据
const kudi = { age: 1000, sons: 2, bros: '10%', }
const _kudi = reactive(kudi)

function aniApple(targets){
  // 优先考虑opacity和CSS transforms。
  anime({
    targets,
    translateX: [
      { value:`+=150`, duration: 3000, delay: 500 },
      { value: `-=50`, duration: 3000, delay: 500 }
    ],
    rotate: {
      value: '1turn',
      duration: 3000,
      easing: 'easeInOutSine' 
    },
    backgroundColor: '#FFF000',
    // duration: 3000,
    // delay: 1000,
    // endDelay: 1000,
    borderRadius:['0%','50%'],
    opacity:1,
    skew: '20deg',
    easing: 'easeInOutExpo',
    direction: 'reverse',
    // loop:3,
    // autoplay: true,
    // keyframes: [
    //   {translateY: -40},
    //   {translateX: 250},
    //   {translateY: 40},
    //   {translateX: 0},
    //   {translateY: 0}
    // ],
  });
}
function aniTable(targets){
  anime({
    targets,
    translateX: 200,
    scale: [
      {value: .1, easing: 'easeOutSine', duration: 500},
      {value: 1, easing: 'easeInOutQuad', duration: 1200}
    ],
    // loop:true,
    delay: anime.stagger(1000, { 
      start: 0, // 延迟从500ms开始，然后每个元素增加100ms。
      grid: [1, 2], 
      from: 'center', // 交错动画开始位置 -- 从中心开始效果
      direction: 'reverse',
      easing: 'easeOutQuad', //交错的时间曲线
      // axis: 'x',
    }),
    rotate: anime.stagger([-360, 360]), // 旋转将在-360deg到360deg之间均匀分布在所有元素之间
    update:function(){

    },
    begin: function(anim) {
      console.log(anim.completed)
    },
    complete: function(anim) {
      console.log(anim.completed)
    }
  });
}
function aniNums(targets){
  anime({
    targets: _kudi,
    age: 10, 
    sons: 200, 
    bros: '100%',
    round: 10, // 将值向上舍入为x小数。
    easing: 'easeInOutExpo', // 时间曲线
    
    update: function() {
      // 这里执行 60次 vue 中不需要了
      // console.log(1)
      // targets.innerHTML = JSON.stringify(_kudi);
    },
    // loop:true,
  });
}
function aniSvg(moveDom, svgDom, pathDom){
  
  // 运动路径动画
  var path = anime.path(pathDom);
  anime({
    targets: moveDom,
    translateX: path('x'),
    translateY: path('y'),
    rotate: path('angle'),
    easing: 'linear',
    duration: 5000,
    // loop: true
  });

  // 画线动画
  anime({
    targets: pathDom,
    strokeDashoffset: [anime.setDashoffset, 0],
    // strokeDashoffset: function(el) { 
    //   var svgLength = anime.setDashoffset(el); 
    //   return [svgLength*0.5, 0]; 
    // },
    easing: 'easeInOutSine',
    duration: 1500,
    delay: function(el, i) { return i * 250 },
    // direction: 'alternate',
    // loop: true
  });
}
onMounted(() => {
  init()
})

function init(){
  // 获取一个 dom 对象
  const oneDom = apple.value
  // console.log(oneDom)
  aniApple(oneDom)

  // 获取dom数组 Proxy(Array)
  const arrDom = table.value
  // console.log(arrDom)
  aniTable(arrDom)

  // 获取数字dom
  const numDom = nums.value
  // console.log(numDom)
  aniNums(numDom)

  // 获取svg dom
  const moveDom = moveIcon.value;
  const svgDom = svg.value;
  const pathDom = path.value;
  // console.log(svgDom)
  aniSvg(moveDom, svgDom, pathDom)
  
}

</script>

<style lang="scss" scoped>

.apple {
  width: 50px;
  height: 50px;
  background-color: #fff;
  opacity:.2;
  transform: translateX(100);

}

.table {
  display: flex;
  flex-wrap: wrap;
  width: 60px;
  .small {
    width: 18px;
    height: 18px;
    margin:1px;
    background-color: greenyellow;
  }
}

.nums {
  font-size: 20px;
}
.moveIcon {
  width: 10px;
  height: 10px;
  background: blue;
}
</style>
