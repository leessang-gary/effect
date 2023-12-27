<!-- 单个汉字动画 
  实现了子组件之间的联动 -- 使用 pinia 全局状态管理
-->
<template>
  <div class="textShow flex flex_r_c mt-10">
    <div ref="single"></div>
  </div>
  <a-space wrap >
    <a-button type="primary" block @click="setCharacter('新')">重置新字</a-button>
    <a-button type="primary" block @click="showCharacter">显示汉字</a-button>
    <a-button type="primary" block @click="hideCharacter">隐藏汉字</a-button>
    <a-button type="primary" block @click="showOutline">显示轮廓</a-button>
    <a-button type="primary" block @click="hideOutline">隐藏轮廓</a-button>
    <a-button type="primary" block @click="updateDimensions(50,50,5)">更改(宽:50 高:50 边距:5) </a-button>
    <a-button type="primary" block @click="updateColor('strokeColor','#008000')">更改strokeColor颜色#008000</a-button>
    <a-button type="primary" block @click="quiz">测验</a-button>
    <a-button type="primary" block @click="cancelQuiz">取消测验</a-button>
    <a-button type="primary" block @click="animateCharacter">动画文字</a-button>
  </a-space>
</template>
<script setup>
import { ref, reactive, watch, watchEffect } from 'vue';
import { useHanziFormStore } from '@/store/form'
const HanziWriter = require('hanzi-writer'); // 获取 HanziWriter 类

let single = ref(null); // dom
let writer = null; // HanziWriter实例

// 获取表单配置 store
const store = useHanziFormStore();

// 输入的文字和笔画都变了 新的实例
watch(
  ()=>store.hanziData.strokes,
  (arr)=>{
    // single.value == dom
    // console.log(single.value)
    // 清空已经加入的内容
    single.value.innerHTML = "";
    // 重置实例
    writer = null;

    // 1. 从网络获取
    // HanziWriter.loadCharacterData('到').then(function(charData) {})
    // 2. 从 npm node_modules 读取笔画数据 只要加入 charDataLoader 参数就不会从网络获取了
    // const data = require('hanzi-writer-data/只');
    // writer = HanziWriter.create(single.value, '我', {
    //   charDataLoader: function() {
    //     return data;
    //   }
    // })
    // 3. arr 是从数据库获取笔画数据
  
    const char = arr[0]
    // console.error(char)
    writer = HanziWriter.create(single.value, char.keyword, {
      ...store.hanziConfig,
      charDataLoader: function() {
        return char.data;
      } 
    });
  }
)

// 笔画时间更改 -- 需要重置writer，不然不生效
watch(
  [
    ()=> store.hanziConfig.strokeAnimationSpeed,
    ()=> store.hanziConfig.delayBetweenStrokes,
  ],
  ()=>{
    single.value.innerHTML = "";
    const char = store.hanziData.strokes[0];
    writer = HanziWriter.create(single.value, char.keyword, {
      ...store.hanziConfig,
      charDataLoader: function() {
        return char.data;
      } 
    });
  }
)

// 加载一个新的汉字并渲染 
const setCharacter = (val)=>{
  store.hanziData.sourceTxt = val
}
// 显示当前隐藏的汉字。
const showCharacter = ()=>{
  store.hanziConfig.showCharacter = true
  if(writer) writer.showCharacter()
}
// 隐藏当前显示的汉字。
const hideCharacter = ()=>{
  store.hanziConfig.showCharacter = false
  if(writer) writer.hideCharacter()
}
// 显示当前隐藏汉字的轮廓。
const showOutline = ()=>{
  store.hanziConfig.showOutline = true
  if(writer) writer.showOutline()
}
// 隐藏当前汉字显示的轮廓。
const hideOutline = ()=>{
  store.hanziConfig.showOutline = false
  if(writer) writer.hideOutline()
}
// 更改宽高边距
const updateDimensions = (width, height, padding)=>{
  store.hanziConfig.width = width
  store.hanziConfig.height = height
  store.hanziConfig.padding = padding
  if(writer){
    writer.updateDimensions({
      width, height, padding
    })
  } 
}
// 更改任何颜色选项的值。
const updateColor = ( target ,color)=>{
  // 使用 store 的 action
  store.setColor(target, color)
  if(writer){
    writer.updateColor(target, color)
  }
}
// 立即取消当前运行的测验
const quiz = ()=>{
  writer.quiz()
}
// 立即取消当前运行的测验
const cancelQuiz = ()=>{
  writer.cancelQuiz()
}
// 书写文字动画
const animateCharacter = ()=>{
  writer.animateCharacter({
    onComplete :function(){
      console.log('demo 动画完成' )
      // 单笔画动画
      // demoChar.animateStroke(0)
    }
  })
}
watchEffect(()=>{
  store.hanziConfig.showCharacter ? showCharacter() : hideCharacter();
  store.hanziConfig.showOutline ? showOutline() : hideOutline();

  updateDimensions(store.hanziConfig.width,store.hanziConfig.height,store.hanziConfig.padding)
  updateColor('strokeColor', store.hanziConfig.strokeColor )
  updateColor('radicalColor', store.hanziConfig.radicalColor )
  updateColor('outlineColor', store.hanziConfig.outlineColor )
  updateColor('highlightColor', store.hanziConfig.highlightColor )
  updateColor('drawingColor', store.hanziConfig.drawingColor )
})
</script>
<style lang="scss" scoped>
.textShow {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  margin-top: 300px;
}
</style>