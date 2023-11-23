import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.vue'

// console.log(routes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/', component: home,
      children:[
        { path: '/home/gsap', name: 'gsap', component: () => import('@/views/gsap.vue')},
        { path: '/home/about', name: 'about', component: () => import('@/views/about.vue') }
      ]
    },
  ]
})

export default router
