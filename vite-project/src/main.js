import './assets/style/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from '@/router'
import { setupStore } from '@/store';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import '@/assets/style/common.scss'
const app = createApp(App)
// 使用 vue-router
app.use(router)
// 使用 pinia
setupStore(app)

app.use(Antd).mount('#app')
