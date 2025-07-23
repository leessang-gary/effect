<template>
  <a-layout class="box">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <siderBase :list="dicts.siderMenus" />
    </a-layout-sider>
    <a-layout class="content" :class="{content_collapsed : collapsed, }">
      <a-layout-header class="header flex">
        <div @click="() => (collapsed = !collapsed)" class="trigger">
          <MenuUnfoldOutlined v-if="collapsed"  />
          <MenuFoldOutlined v-else />
        </div>
        <top :msgInfo="msgInfo" @handleChangeInfo="handleChangeInfo"> 这是一个slot </top>
      </a-layout-header>
      <a-layout-content class="middle">
        <navTabs v-if="navTabsStore.len" class="navrow" />
        <div class="mainwin" :class="{ 'mainwin1_': navTabsStore.len }">
          <router-view></router-view>
        </div>
        
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import siderBase from "@/components/sider/base.vue";
import top from "@/components/sider/top.vue";
import navTabs from "@/components/sider/navTabs.vue";

// import { RouterLink, RouterView } from 'vue-router';
import dicts from '@/utils/dicts.js';
import { useNavTabsStore } from '@/store/user';

import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined 
} from '@ant-design/icons-vue';

import { ref } from 'vue';
// 侧边导航切换宽度
const collapsed = ref(false);

const msgInfo = ref('Hello')
const handleChangeInfo = (info)=>{
  msgInfo.value = info
}
// 打开的页面列表 放到pinia
const navTabsStore = useNavTabsStore();
</script>
<style lang="scss" scoped>
$navbar-height: 30px;
.box {
  width: 100vw;
  height: 100vh;
  background: #fff;
  .content {
    height: 100%;
    width: calc(100%);
    .header {
      width: 100%;
      height: 64px;
      background: #fff;
      padding: 0;
      .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
      }

      .trigger:hover {
        color: #1890ff;
      }
    }

    .middle {
      width: calc(100vw - 200px);
      height: calc(100% - 64px);
      min-width: 800px;
      overflow-x: auto;
      .navrow {
        height: $navbar-height;
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        background-color: red;
        white-space: nowrap;
      }
      .mainwin {
        width: 100%;
        height: 100%;
        overflow-y: auto;
      }
      .mainwin1_ {
        height: calc(100% - $navbar-height);
      }
    }
  }
  .content_collapsed {
    width: calc(100%);
    .middle {
      width: calc(100vw - 80px);
    }
  }
}
</style>