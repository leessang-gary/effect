

<template>
  <a-menu 
    v-model:openKeys="openKeys" 
    v-model:selectedKeys="selectedKeys" 
    theme="dark" 
    mode="inline"
    :items="list"
    @click="handleClick"
  >
    <!-- <a-menu-item :key="item.key" v-for="(item) in list" >
      <RouterLink :to="item.to"> {{ item.name }}</RouterLink>
    </a-menu-item> -->
  </a-menu>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useNavTabsStore } from '@/store/user';
const router = useRouter()
const route = useRoute()
const selectedKeys = ref(['home']);
const openKeys = ref(['home']);

const props = defineProps({
  list: {
    type: Array,
    required: true,
  }
})

// console.log(props.list)

function handleClick(e){
  const navTabsStore = useNavTabsStore();
  const name = e.item.title;
  const path = e.item.to;
  // 添加 navtabs
  navTabsStore.addNavTab({ name,  key: path, chosed: false });
  // 选中 tab
  navTabsStore.chooseNavTab(path)
  router.push( path)
}

</script>
<style lang="scss" scoped>
  
</style>
