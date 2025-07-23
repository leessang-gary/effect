import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { useCounterStore } from './counter'

// 打开的导航栏数组
export const useNavTabsStore = defineStore('navTabs',()=>{
  let choosedTabIndex = -1
  const arr = ref([])
  const len = computed(()=> arr.value.length)

  function addNavTab(item){
    const index = getTabIndex(item.key)
    // if(index == -1){
      arr.value.push(item)
    // }
  }

  function delNavTab(item){
    const index = getTabIndex(item.key)
    if(index > -1){
      arr.value.splice(index, 1)
    }
  }

  // 单选
  function chooseNavTab(key){
    arr.value.forEach( item => {
      item.chosed = item.key == key
    });
  }

  function getTabIndex(tabKey){
    // console.log(e)
    const index = arr.value.map(item => item.key).findIndex(key=> key == tabKey) 
    // console.log(index)
    return index
  }

  return {
    arr, len, addNavTab, delNavTab, chooseNavTab
  }
})

//  第二个参数是一个函数
export const useLoginStore = defineStore('login',()=>{
  const token = ref(null); // state
  function setToken(res){ // actions
    token.value = res;
  }
  return {
    token,
    setToken,
  }
})

// 第二个参数是一个对象
export const useUserStore = defineStore('user',{
  state:()=>({
    userInfo: null,
    obj:{
      a:1
    }
  }),
  actions: {
    setUserInfo(data){
      this.userInfo = data;
    },
    getCount(){
      const counter = useCounterStore()
      if(counter.count){
        alert(counter.doubleCount)
      }
    }
  },
  persist: {
    paths: ['userInfo','obj.a'],
  },
})