<script setup>
import { ref } from 'vue';
const selectedKeys = ref(['1']);
defineProps({
  list: {
    type: Array,
    required: true,
  }
})
</script>

<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <a-menu-item :key="item.key" v-for="(item) in list" >
      <RouterLink :to="item.to"> {{ item.name }}</RouterLink>
    </a-menu-item>
  </a-menu>
</template>
<style lang="scss" scoped>
  
</style>
