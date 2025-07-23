<template>
  <div>
    <a-tag closable @close="handleClose(tag)" :color="setColor(tag)"
      v-for="tag in tags" :key="tag.key">
      {{ tag.name }} 
    </a-tag>
  </div>
  
</template>
<script setup>
import { ref, reactive, nextTick } from 'vue';
import { useNavTabsStore } from '@/store/user';

const navTabsStore = useNavTabsStore();
const tags = navTabsStore.arr;
const handleClose = tag => {
  navTabsStore.delNavTab(tag)
}
const setColor = item =>{
  return item.chosed ? '#108ee9' : ''
}
</script>
<style scoped lang="scss">

</style>
