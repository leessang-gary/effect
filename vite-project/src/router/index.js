import { createRouter, createWebHistory } from 'vue-router'
import dicts from '@/utils/dicts.js';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: dicts.routes,
})

export default router
