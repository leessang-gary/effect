import dicts from '@/utils/dicts.js';
function csl(){
  console.log(123)
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
export default {
  csl,
  autoGenerationName,
}



