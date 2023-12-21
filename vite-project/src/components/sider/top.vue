<template>
  <div class="topBox flex flex_r_b">
    <div class="flex">
      <div class="greetings">{{ msgInfo }}</div>
      <a-button type="primary">Primary Button</a-button>
      <slot />
    </div>
    <div class="flex mr-6">
      {{ userInfo.name }}
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
import Api from '@/api'

let userInfo = reactive({name:''})
onMounted(async ()=>{
  const res = await Api.userApi.getUserInfo()
  if(res.code == 0){
    userInfo.name = res.data.name
    // console.log(res)
  } else {
    message.error(res.data)
  }
})
setTimeout(()=>{
  // 输出事件
  // emit('handleChangeInfo', `hello world`)
},3000)
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
