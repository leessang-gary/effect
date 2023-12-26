<template>
  <div class="topBox flex flex_r_b">
    <div class="flex">
      <div class="greetings">{{ msgInfo }}</div>
      <a-button type="primary">Primary Button</a-button>
      <slot />
    </div>
    <div class="flex mr-6">
      <div ref="fname" class="flex"></div>
      <div ref="sname" class="flex"></div>
      <!-- {{ userInfo.name }} -->
    </div>
  </div>
</template>
<script setup>
// 定义组件的 props
defineProps({
  msgInfo : { type: String, required: true },
})
// 定义组件事件
const emit = defineEmits([
  'handleChangeInfo'
])

import { computed , ref, reactive, onMounted, toRefs } from 'vue';
import { message } from 'ant-design-vue';
import Api from '@/api';
const HanziWriter = require('hanzi-writer');

let userInfo = reactive({name:''})
const fname = ref(null) // 第1个字的DOM
const sname = ref(null) // 第2个字的DOM

let WriteFname = null; // 要写的第1个字
let WriteSname = null; // 要写的第2个字

onMounted(async ()=>{
  init()
})

// 查询用户信息
const init = async ()=>{
  const res = await Api.userApi.getUserInfo()
  // console.log(res)
  if(res.code == 0){
    userInfo.name = res.data.name
    Api.svgApi.queryStrokes({ charsList: userInfo.name.split('')}).then(strokes=>{
      strokes.data.map((item,index)=>{
        if(index == 0){ WriteFname = createChart(fname, item.keyword, item.data) }
        if(index == 1){ WriteSname = createChart(sname, item.keyword, item.data) }
      })
      handleAnimate()
    })
    
  } else {
    message.error(res.data)
  }

  // 输出事件
  emit('handleChangeInfo', `hello world`)
}



// 创建字符对象
const createChart = (dom, keyword, data)=>{
  return HanziWriter.create(dom.value, keyword, {
    width: 30,
    height: 30,
    padding: 0,
    strokeColor: '#000',
    radicalColor: '#000',
    showOutline: false, // 显示剩下的
    strokeAnimationSpeed: .5, // 5x normal speed
    delayBetweenStrokes: 10, // milliseconds
    delayBetweenLoops: 1000,
    charDataLoader: function() {
      return data;
    } 
  }); 
}

// 动画字符
const handleAnimate = ()=>{
  var delayBetweenAnimations = 1000; // milliseconds
  WriteFname.hideCharacter();
  WriteSname.hideCharacter();

  WriteFname.animateCharacter({
    onComplete: function() {
      setTimeout(function() {
        WriteSname.animateCharacter();
      }, delayBetweenAnimations);
    }
  }); 
}
</script>


<style scoped>
.topBox {
  flex:1;
  .greetings {
    font-size: 16px;
  }
}


@media (min-width: 1024px) {
  .greetings {
    font-size: 12px;
  }
}
</style>
