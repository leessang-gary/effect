import home from '@/views/home.vue'
import tools from '@/utils/tools.js'
import { h, ref } from 'vue';
import { MailOutlined, CalendarOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';

// tools.csl()

// 路由
const routes = [
  { 
    path: '/', name: 'home', component: home,  icon: MailOutlined,
    children:[
      { path: '/home/gsap', name: 'gsap', component: () => import('@/views/gsap.vue'), icon: MailOutlined,},
      { path: '/home/about', name: 'about', component: () => import('@/views/about.vue'), icon: CalendarOutlined, },
      { path: '/home/anime', name: 'anime', component: () => import('@/views/anime.vue'), icon: AppstoreOutlined, },
      { path: '/home/hanziwrite', name: 'hanziwrite', component: () => import('@/views/hanziwrite.vue'), icon: SettingOutlined, },
      { path: '/home/svg', name: 'svg', component: () => import('@/views/svg.vue'), icon: CalendarOutlined, }
    ]
  },
  
]
// 侧边栏菜单
const siderMenus = routes.map( route => {
  const obj = {
    key: route.name,
    icon: () => h(route.icon),
    label: route.name,
    title: route.name,
    to: route.path
  }
  if(Array.isArray(route.children) && route.children.length){
    obj.children = route.children.map( child => {
      return {
        key: child.name,
        icon: () => h(child.icon),
        label: child.name,
        title: child.name,
        to: child.path
      }
    })
  }
  return obj
})

export default {
  siderMenus,
  routes
}
