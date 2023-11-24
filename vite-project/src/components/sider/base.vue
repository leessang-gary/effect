

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
import { useRouter, useRoute } from 'vue-router'
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
  const path = e.item.to
  router.push( path)
}

</script>
<style lang="scss" scoped>
  
</style>
