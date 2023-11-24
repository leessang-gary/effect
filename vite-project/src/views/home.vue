<template>
  <a-layout class="box">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <siderBase :list="dicts.siderMenus" />
    </a-layout-sider>
    <a-layout class="content">
      <a-layout-header class="header flex">
        <div @click="() => (collapsed = !collapsed)" class="trigger">
          <MenuUnfoldOutlined v-if="collapsed"  />
          <MenuFoldOutlined v-else />
        </div>
        <HelloWorld msg="Hello" />
      </a-layout-header>
      <a-layout-content class="middle">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import siderBase from "@/components/sider/base.vue";
import HelloWorld from "@/components/HelloWorld.vue";

import { RouterLink, RouterView } from 'vue-router';
import dicts  from '@/utils/dicts.js';

import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined 
} from '@ant-design/icons-vue';

import { ref } from 'vue';
const collapsed = ref(false);
</script>
<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  background: #fff;
  .content {
    height: 100%;
    .header {
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
      // background: red;
    }
  }
}
</style>