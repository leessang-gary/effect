import home from '@/views/home/index.vue'
import run from '@/views/home/index.vue'
import login from '@/views/login/index.vue'
import tools from '@/utils/tools.js'
import { h, ref } from 'vue';
import { MailOutlined, CalendarOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';

// tools.csl()

// 路由
const siderRoutes = [
  { 
    path: '/', name: 'home', component: home,  icon: MailOutlined,
    children:[
      { path: '/home/about', name: 'about', component: () => import('@/views/about.vue'), icon: CalendarOutlined, },
    ]
  },
  { 
    path: '/run', name: 'run', component: run,  icon: MailOutlined,
    children:[
      { path: '/home/gsap', name: 'gsap', component: () => import('@/views/run/gsap.vue'), icon: MailOutlined,},
      { path: '/home/anime', name: 'anime', component: () => import('@/views/run/anime.vue'), icon: AppstoreOutlined, },
      { path: '/home/hanziwrite', name: 'hanziwrite', component: () => import('@/views/run/hanziwrite.vue'), icon: SettingOutlined, },
      { path: '/home/svg', name: 'svg', component: () => import('@/views/run/svg.vue'), icon: CalendarOutlined, }
    ]
  }, 
]
// 侧边栏菜单
const siderMenus = siderRoutes.map( route => {
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

// 非侧边栏路由页面
const otherRoutes = [
  { path: '/login', name: 'login', component: login },
]

const routes = [...siderRoutes, ...otherRoutes ]
export default {
  siderMenus,
  routes
}
