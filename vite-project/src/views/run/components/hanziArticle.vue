<!-- 写文章动画 -->
<template>
  <div>
    <div class="flex flex_r_c flex_w">
      <div ref="domList" class="small" v-for="item in charsList"></div>
    </div>
    <a-button type="primary" block @click="handleArrAnimate()">动画文章</a-button>
  </div>
  

</template>
<script setup>
import { ref, reactive, watch, watchEffect, nextTick } from 'vue';
import { useHanziFormStore } from '@/store/form'
import tools from '@/utils/tools.js'

const HanziWriter = require('hanzi-writer'); // 获取 HanziWriter 类

const domList = ref(null); // 获取dom数组 Proxy(Array)
let writerList = []; // HanziWriter实例数组
let charsList = ref([]) ; // 文字数组 -- 用来循环渲染dom

// 获取表单配置 store
const store = useHanziFormStore();

// 输入的文字和笔画都变了 新的实例
watch(
  ()=>store.hanziData.strokes,
  async (strokes)=>{
    if(!strokes) return
    // 清空已经加入的内容
    if(domList.value){
      domList.value.forEach( item=> item.innerHTML ='')
    }
    // 重置实例
    writerList = [];

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

    // charsList 用来更新DOM的数量
    charsList.value = store.hanziData.sourceTxt.split('');
    
    await nextTick(); // 为了获取DOM 之后执行
    writerList = strokes.map((item,index)=>{
      // HanziWriter实例
      const val = HanziWriter.create( domList.value[index], item.keyword, {
        ...store.hanziConfig,
        charDataLoader: function() {
          return item.data;
        } 
      }); 
      return val
    })
  }
)

// 笔画时间更改 -- 需要重置writer，不然不生效
watch(
  [
    ()=> store.hanziConfig.strokeAnimationSpeed,
    ()=> store.hanziConfig.delayBetweenStrokes,
  ],
  async ()=>{
    if(!store.hanziData.strokes) return
    if(domList.value){
      domList.value.forEach( item=> item.innerHTML ='')
    }

    // charsList 用来更新DOM的数量
    charsList.value = store.hanziData.sourceTxt.split('');
    
    await nextTick(); // 为了获取DOM 之后执行
    writerList = store.hanziData.strokes.map((item,index)=>{
      // HanziWriter实例
      const val = HanziWriter.create( domList.value[index], item.keyword, {
        ...store.hanziConfig,
        charDataLoader: function() {
          return item.data;
        } 
      }); 
      return val
    })
  }
)

// 显示当前隐藏的汉字。
const showCharacter = ()=>{
  if(writerList){
    writerList.forEach(writer=>{
      writer.showCharacter()
    })
  }
}
// 隐藏当前显示的汉字。
const hideCharacter = ()=>{
  if(writerList){
    writerList.forEach(writer=>{
      writer.hideCharacter()
    })
  }
}
// 显示当前隐藏汉字的轮廓。
const showOutline = ()=>{
  if(writerList){
    writerList.forEach(writer=>{
      writer.showOutline()
    })
  }
}
// 隐藏当前汉字显示的轮廓。
const hideOutline = ()=>{
  if(writerList){
    writerList.forEach(writer=>{
      writer.hideOutline()
    })
  }
}
// 更改宽高边距
const updateDimensions = (width, height, padding)=>{
  if(writerList){
    writerList.forEach(writer=>{
      writer.updateDimensions({ width, height, padding })
    })
  }
}
// 更改任何颜色选项的值。
const updateColor = ( target ,color)=>{
  if(writerList){
    writerList.forEach(writer=>{
      writer.updateColor(target, color)
    })
  }
}
// writer数组 动画
const handleArrAnimate = async ()=>{
  // 先隐藏
  writerList.forEach(item=> item.hideCharacter())
  // 循环显示
  for (let index = 0; index < writerList.length; index++) {
    const element = writerList[index];
    await tools.animateCharacter(element)
  }
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

</style>