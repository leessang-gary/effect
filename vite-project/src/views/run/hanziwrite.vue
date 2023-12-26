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

      <div class="textShow flex flex_r_c mt-10">
        <div ref="demoDom"></div>
      </div>
      <a-space wrap>
        <a-button type="primary" block @click="renderFormConfig">新建汉字</a-button>
        <a-button type="primary" block @click="setCharacter">重置新字</a-button>
        <a-button type="primary" block @click="showCharacter">显示汉字</a-button>
        <a-button type="primary" block @click="hideCharacter">隐藏汉字</a-button>
        <a-button type="primary" block @click="showOutline">显示轮廓</a-button>
        <a-button type="primary" block @click="hideOutline">隐藏轮廓</a-button>
        <a-button type="primary" block @click="updateDimensions(30,30,3)">更改(宽:30 高:30 边距:3) </a-button>
        <a-button type="primary" block @click="updateColor">更改颜色#ff0000</a-button>
        <a-button type="primary" block @click="quiz">测验</a-button>
        <a-button type="primary" block @click="cancelQuiz">取消测验</a-button>
        <a-button type="primary" block @click="animateCharacter()">动画文字</a-button>
      </a-space>
    </div>
    <configForm class="right" 
      ref="configFormRef"
      @createText="createText"
      @updateDimensions="updateDimensions"
      @updateColor="updateColor"
      @showCharacter="showCharacter"
      @hideCharacter="hideCharacter"
      @showOutline="showOutline"
      @hideOutline="hideOutline"
      @animateCharacter="animateCharacter"
    />
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
import Api from '@/api';
import { ref, reactive , onMounted } from "vue";

import configForm from "@/components/form/hanziConfig.vue";
const HanziWriter = require('hanzi-writer'); // 获取 HanziWriter 类

const demoDom = ref(null); // demo dom
let demoChar = null; // demo 实例 

const configFormRef = ref() // 子组件
// 创建字符
const createText = async(defaultConfig = {}) => {
  const txt = defaultConfig.sourceTxt
  if(!txt) {
    message.error('请输入汉字')
    return
  }
  // console.log(demoDom.value)
  // 清空已经加入的内容
  demoDom.value.innerHTML = "";
  // HanziWriter实例
  demoChar = null;
  // 从本地读取笔画数据 只要加入 charDataLoader 参数就不会从网络获取了
  // const data = require('hanzi-writer-data/只');
  // demoChar = HanziWriter.create(demoDom.value, '我', {})

  // 从数据库获取笔画数据
  const strokes = await getData(txt);
  // console.error(strokes)
  const data = strokes[0].data;
  demoChar = HanziWriter.create(demoDom.value, txt, {
    ...defaultConfig,
    charDataLoader: function() {
      return data;
    } 
  }); 
};
// 加载一个新的汉字并渲染 -- 没成功
const setCharacter = ()=>{
  demoChar.setCharacter(suChar)
}
// 显示当前隐藏的汉字。
const showCharacter = ()=>{
  demoChar.showCharacter()
}
// 隐藏当前显示的汉字。
const hideCharacter = ()=>{
  demoChar.hideCharacter()
}
// 显示当前隐藏汉字的轮廓。
const showOutline = ()=>{
  if(demoChar) demoChar.showOutline()
}
// 隐藏当前汉字显示的轮廓。
const hideOutline = ()=>{
  if(demoChar) demoChar.hideOutline()
}
// 更改宽高边距
const updateDimensions = (width, height, padding)=>{
  demoChar.updateDimensions({
    width, height, padding
  })
}
// 更改任何颜色选项的值。
const updateColor = ({
  strokeColor = '#ff0000', 
  radicalColor = '#ff0000', 
  outlineColor = '#ff0000', 
  highlightColor = '#ff0000', 
  drawingColor = '#ff0000'
})=>{
  if(demoChar){
    demoChar.updateColor('strokeColor', strokeColor)
    demoChar.updateColor('radicalColor', radicalColor)
    demoChar.updateColor('outlineColor', outlineColor)
    demoChar.updateColor('highlightColor', highlightColor)
    demoChar.updateColor('drawingColor', drawingColor)
  }

}
// 立即取消当前运行的测验
const quiz = ()=>{
  demoChar.quiz()
}
// 立即取消当前运行的测验
const cancelQuiz = ()=>{
  demoChar.cancelQuiz()
}

// 写字动画 传参没用 -- 只能初始化时设置速度
const animateCharacter = async (config)=>{
  // config 表单重新传动画速度参数
  if(config){
    await createText(config)
  }
  demoChar.animateCharacter({
    onComplete :function(){
      console.log('demo 动画完成' )
      // 单笔画动画
      // demoChar.animateStroke(0)
    }
  })
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

  renderFormConfig();
  renderOneChar()

}
// 初始化子组件
function renderFormConfig(){
  // 父组件调用子组件 init 方法
  configFormRef.value.init()
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

// 查询接口数据
const getData = async (val)=>{
  const res = await Api.svgApi.queryStrokes({ charsList: val.split('')})
  return res.data
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
    .textShow {
      width: 100px;
      height: 100px;
      border: 1px solid #000;
      margin-top: 300px;
      
    }
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
