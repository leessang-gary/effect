<!-- 
  汉字书写博客 https://www.cnblogs.com/Shadow3627/p/11582651.html
  meteor教程 https://www.w3cschool.cn/discovermeteor/rbj81jjm.html
  git 
  https://github.com/skishore/makemeahanzi
  https://github.com/chanind/hanzi-writer
  https://github.com/chanind/hanzi-writer-data
  https://hanziwriter.org/cn/docs.html
 -->
<template>
  <div class="pageContainer flex flex_s"> 
    <div class="left">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="single">
          <single />
        </a-tab-pane>
        <a-tab-pane key="2" tab="articles">
          <articles />
        </a-tab-pane>
        <a-tab-pane key="3" tab="other" force-render>
          <demo />
        </a-tab-pane>
      </a-tabs>
    </div>
    <hanziForm class="right"  ref="hanziFormRef" @handleEmit="handleEmit" />
  </div>
  
</template>
<script setup>
import { message } from "ant-design-vue";
import { ref, reactive , onMounted, nextTick } from "vue";

import hanziForm from "./components/hanziForm.vue";
import single from "./components/hanziSingle.vue"; 
import articles from "./components/hanziArticle.vue"; 
import demo from "./components/hanziOther.vue"; 

const activeKey = ref('3');
const hanziFormRef = ref() // 表单子组件

// 父组件接收表单子组件的值
const handleEmit = async(data) =>{
  console.log(data)
}
function init(){
  // 父组件调用子组件 init 方法
  hanziFormRef.value.init();
}
onMounted(() => {
  init()
});

</script>
<style lang="scss" scoped>
.pageContainer {
  width: 100%;
  height: 100%;
  .left {
    flex:1;
  }
  .right {
    flex:3;
  }
}

</style>
