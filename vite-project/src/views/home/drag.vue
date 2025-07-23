<!-- 
  https://www.itxst.com/vue-draggable-next/tutorial.html

 -->
<template>
  <div>拖拽页面元素</div>
  <!--  -->
  <draggable
    :list="list"
    class="flex flex_w"
    ghost-class="ghost"        
    chosen-class="chosenClass" 
    item-key="index"
    @end="handleDrag"
    >
    <template #item="{ element }">
      <div class="child">
        {{ element.id }}
      </div>
    </template>
  </draggable>
  <div>拖拽页面组件</div>
  <draggable
    :list="comList"
    class="flex flex_w"
    ghost-class="ghost"        
    chosen-class="chosenClass" 
    item-key="index"
    @end="handleDrag"
    >
    <template #item="{ element }">
      <div class="child">
        <component :is="element.icon"></component>
        {{ element.name }}
      </div>
    </template>
  </draggable>
</template>
<script setup>
import {  MailOutlined,  CalendarOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import draggable from 'vuedraggable';
const list = ref(
  Array.from(Array(20),(v,i)=>{
    return { id: i}
  })
)
const arr = [ MailOutlined,  CalendarOutlined, AppstoreOutlined, SettingOutlined].map( (item,index)=>{
  return {
    icon : item,
    key: index,
    name: `icon ${index}`,
  }
})
let comList = ref(arr)
const handleDrag = e =>{
  console.log(e)
}
</script>
<style lang="scss" scoped>
.child {
  width: 200px;
  height: 50px;
  margin: 30px;
  background-color: aqua;
}
.chosenClass {
  background-color: green;
}
.ghost {
  background-color: red;
}

</style>
