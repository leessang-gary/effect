<template>
  <div>
    {{ userList }}

  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import Api from '@/api'
import { useLoginStore } from '@/store/user'
const loginStore = useLoginStore()

let userList = reactive([1,2,3])
onMounted(async()=>{
  const res = await Api.userApi.getUserList({
    limit: 10,
    offset: 0,
  })
  userList = res.data
  
  const text = '前端开发'
  Api.svgApi.queryStrokes({
    charsList: text.split('')
  }).then(res=>{
    loginStore.setToken('')
    loginStore.$patch((state)=>{
      state.token = ''
    })
  })
})

</script>
<style lang="scss" scoped>
  
</style>
