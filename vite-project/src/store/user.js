import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { useCounterStore } from './counter'


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