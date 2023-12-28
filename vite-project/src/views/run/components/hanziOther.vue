<template>
  <div ref="su"></div>
  <div ref="da"></div>
  <div @click="handleAnimate" class="btn"> Run </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const HanziWriter = require('hanzi-writer'); // 获取 HanziWriter 类

const su = ref(null)
const da = ref(null)
let suChar, daChar;
function init(){
  suChar = HanziWriter.create(su.value, '蘇', {
  width: 40,
  height: 40,
  padding: 5,
  strokeColor: '#000',
  radicalColor: '#168F16',
  showOutline: false, // 显示剩下的
  strokeAnimationSpeed: .5, // 5x normal speed
  delayBetweenStrokes: 10, // milliseconds
  delayBetweenLoops: 3000
});

daChar = HanziWriter.create(da.value, '达', {
  width: 40,
  height: 40,
  padding: 5,
  strokeColor: '#000',
  radicalColor: '#168F16',
  showOutline: false, // 显示剩下的
  strokeAnimationSpeed: 5, // 5x normal speed
  delayBetweenStrokes: 1, // milliseconds
  delayBetweenLoops: 3000
});
}

// 创建一个汉字 并获取它的所有笔画 svg显示
function renderOneChar(){
  // 添加一个 svg 汉字
  HanziWriter.loadCharacterData('到').then(function(charData) {
    var target = su.value
    for (var i = 0; i < charData.strokes.length; i++) {
      var strokesPortion = charData.strokes.slice(0, i + 1);
      renderFanningStrokes(target, strokesPortion);
    }
  });
}
// 渲染笔画
function renderFanningStrokes(target, strokes) {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.width = '75px';
  svg.style.height = '75px';
  svg.style.border = '1px solid #EEE'
  svg.style.marginRight = '3px'
  target.appendChild(svg);
  // console.log(svg)
  var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  // set the transform property on the g element so the character renders at 75x75
  var transformData = HanziWriter.getScalingTransform(75, 75);
  group.setAttributeNS(null, 'transform', transformData.transform);
  svg.appendChild(group);

  strokes.forEach(function(strokePath) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttributeNS(null, 'd', strokePath);
    // style the character paths
    path.style.fill = '#555';
    group.appendChild(path);
  });
}
const handleAnimate = ()=>{
  // base 动画
  // writer.animateCharacter(); 
  // 词组动画 
  var delayBetweenAnimations = 1000; // milliseconds
  suChar.hideCharacter();
  daChar.hideCharacter();

  suChar.animateCharacter({
    onComplete: function() {
      setTimeout(function() {
        daChar.animateCharacter();
      }, delayBetweenAnimations);
    }
  }); 
}
renderOneChar()
onMounted(()=>{
  init()
})

</script>
<style lang="scss" scoped>
.btn {
  width: 80px;
  padding: 10px 20px;
  background: #1677ff;
  border-radius: 6px;
  text-align: center;
}
</style>