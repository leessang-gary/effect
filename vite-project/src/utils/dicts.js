import home from '@/views/home/index.vue'
import login from '@/views/login/index.vue'
import tools from '@/utils/tools.js'
import { h, ref } from 'vue';
import { MailOutlined, CalendarOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';

tools.csl()

// 路由
const siderRoutes = [
  { 
    path: '/', name: 'home', component: home,  icon: MailOutlined,
    children:[
      { path: '/home/about', name: 'about', component: () => import('@/views/home/about.vue'), icon: CalendarOutlined, },
    ]
  },
  { 
    path: '/', name: 'run', component: home,  icon: MailOutlined,
    children:[
      { path: '/run/gsap', name: 'gsap', component: () => import('@/views/run/gsap.vue'), icon: MailOutlined,},
      { path: '/run/anime', name: 'anime', component: () => import('@/views/run/anime.vue'), icon: AppstoreOutlined, },
      { path: '/run/hanziwrite', name: 'hanziwrite', component: () => import('@/views/run/hanziwrite.vue'), icon: SettingOutlined, },
      { path: '/run/svg', name: 'svg', component: () => import('@/views/run/svg.vue'), icon: CalendarOutlined, },
    ]
  }, 
  { 
    path: '/', name: 'three', component: home,  icon: MailOutlined,
    children:[
      { path: '/three/plane', name: 'plane', component: () => import('@/views/three/plane.vue'), icon: CalendarOutlined, }
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

// 总路由
const routes = [...siderRoutes, ...otherRoutes ]

// 随机生成的用户名
const surname = `去此取彼`

const fiveColors = `青、黄、赤、白、黑`
const fiveSounds = `宫、商、角、徵、羽`
const fiveTastes = `酸、苦、甘、辛、咸`

const firstName = [...surname.split('')]
const secondName = [...fiveColors.split(`、`),...fiveSounds.split(`、`),...fiveTastes.split(`、`),] 

export default {
  siderMenus,
  routes,
  firstName,
  secondName
}
