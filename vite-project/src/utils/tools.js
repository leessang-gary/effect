import dicts from '@/utils/dicts.js';
import NP from 'number-precision';

// 前端使用工具库解决计算精度问题
function csl(){
  NP.strip(0.09999999999999998); // = 0.1
  NP.plus(0.1, 0.2);             // = 0.3, not 0.30000000000000004
  NP.minus(1.0, 0.9);            // = 0.1, not 0.09999999999999998
  NP.times(3, 0.3);              // = 0.9, not 0.8999999999999999
  NP.divide(1.21, 1.1);          // = 1.1, not 1.0999999999999999
  NP.round(0.105, 2);            // = 0.11, not 0.1
}

// 随机获取数组的一项
function randomArrItem(arr){
  const index = Math.floor(Math.random() * arr.length)
  return arr[index];
}

// 自动生成姓名
function autoGenerationName(){
  return randomArrItem(dicts.firstName) + randomArrItem(dicts.secondName) 
}

// 获取随机颜色
function randomColor() {
  return '#' + Math.random().toString(16).substr(-6);
}


// 动画字符 promise
function animateCharacter(writer){
  return new Promise(resolve=>{
    writer.animateCharacter({
      onComplete: function() {
        resolve()
      }
    }); 
  })
} 


export default {
  csl,
  autoGenerationName,
  animateCharacter,
  randomColor,
}



