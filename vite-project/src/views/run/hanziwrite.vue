<!-- 
  汉字书写博客 https://www.cnblogs.com/Shadow3627/p/11582651.html
  meteor教程 https://www.w3cschool.cn/discovermeteor/rbj81jjm.html
  git 
  https://github.com/skishore/makemeahanzi
  https://github.com/chanind/hanzi-writer
  https://github.com/chanind/hanzi-writer-data
  https://hanziwriter.org/cn/docs.html
 -->
<template>
  <div class="pageContainer flex flex_s"> 
    <div class="left">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="single">
          <single />
        </a-tab-pane>
        <a-tab-pane key="2" tab="articles">
          <articles />
        </a-tab-pane>
        <a-tab-pane key="3" tab="other" force-render>
          Content of Tab Pane 3
        </a-tab-pane>
      </a-tabs>
      

    </div>
    <hanziForm class="right"  ref="hanziFormRef" @handleEmit="handleEmit" />
  </div>
  
  
  <!-- su da -->
  <div ref="su"></div>
  <div ref="da"></div>
  <div @click="handleAnimate" class="btn">
    Run
  </div>
</template>
<script setup>
import { message } from "ant-design-vue";
import { ref, reactive , onMounted, nextTick } from "vue";

import hanziForm from "./components/hanziForm.vue";
import single from "./components/hanziSingle.vue"; 
import articles from "./components/hanziArticle.vue"; 


const HanziWriter = require('hanzi-writer'); // 获取 HanziWriter 类
const activeKey = ref('2');
const hanziFormRef = ref() // 表单子组件

// 父组件接收表单子组件的值
const handleEmit = async(data) =>{
  console.log(data)
}

const su = ref(null)
const da = ref(null)
let suChar = null;
let daChar = null;

function init(){
  // other
  suChar = HanziWriter.create(su.value, '蘇', {
    width: 40,
    height: 40,
    padding: 5,
    strokeColor: '#000',
    radicalColor: '#168F16',
    showOutline: false, // 显示剩下的
    strokeAnimationSpeed: .5, // 5x normal speed
    delayBetweenStrokes: 10, // milliseconds
    delayBetweenLoops: 3000
  });

  daChar = HanziWriter.create(da.value, '达', {
    width: 40,
    height: 40,
    padding: 5,
    strokeColor: '#000',
    radicalColor: '#168F16',
    showOutline: false, // 显示剩下的
    strokeAnimationSpeed: 5, // 5x normal speed
    delayBetweenStrokes: 1, // milliseconds
    delayBetweenLoops: 3000
  });

  // 父组件调用子组件 init 方法
  hanziFormRef.value.init();
  // renderOneChar()

}

// 创建一个汉字 并获取它的所有笔画 svg显示
function renderOneChar(){
  // 添加一个 svg 汉字
  HanziWriter.loadCharacterData('到').then(function(charData) {
    var target = su.value
    for (var i = 0; i < charData.strokes.length; i++) {
      var strokesPortion = charData.strokes.slice(0, i + 1);
      renderFanningStrokes(target, strokesPortion);
    }
  });
}

// 渲染笔画
function renderFanningStrokes(target, strokes) {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.width = '75px';
  svg.style.height = '75px';
  svg.style.border = '1px solid #EEE'
  svg.style.marginRight = '3px'
  target.appendChild(svg);
  // console.log(svg)
  var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  // set the transform property on the g element so the character renders at 75x75
  var transformData = HanziWriter.getScalingTransform(75, 75);
  group.setAttributeNS(null, 'transform', transformData.transform);
  svg.appendChild(group);

  strokes.forEach(function(strokePath) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttributeNS(null, 'd', strokePath);
    // style the character paths
    path.style.fill = '#555';
    group.appendChild(path);
  });
}

const handleAnimate = ()=>{
  // base 动画
  // writer.animateCharacter(); 
  // 词组动画 
  var delayBetweenAnimations = 1000; // milliseconds
  suChar.hideCharacter();
  daChar.hideCharacter();

  suChar.animateCharacter({
    onComplete: function() {
      setTimeout(function() {
        daChar.animateCharacter();
      }, delayBetweenAnimations);
    }
  }); 
}

onMounted(() => {
  init()
});

</script>
<style lang="scss" scoped>
.pageContainer {
  width: 100%;
  height: 100%;
  .left {
    flex:1;
  }
  .right {
    flex:3;
  }
}
.btn {
  width: 80px;
  padding: 10px 20px;
  background: #1677ff;
  border-radius: 6px;
  text-align: center;
}
</style>
