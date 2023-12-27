import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import { hanziFormConfig } from '@/config'
export const useHanziFormStore = defineStore('hanziForm',()=>{
  // state
  // console.error(hanziFormConfig)
  let hanziConfig = reactive(hanziFormConfig);
  let hanziData = reactive({ sourceTxt:'', strokes:[] })


  // actions
  // 重置初始值
  function $reset(){
    hanziConfig = hanziFormConfig;
  }
  function setColor(target,color){
    hanziConfig[target] = color
  }

  return {
    hanziConfig,
    hanziData,
    $reset,
    setColor,
  }
})