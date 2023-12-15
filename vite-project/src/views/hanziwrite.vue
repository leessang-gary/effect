<!-- 
  汉字书写博客 https://www.cnblogs.com/Shadow3627/p/11582651.html
  meteor教程 https://www.w3cschool.cn/discovermeteor/rbj81jjm.html
  git 
  https://github.com/skishore/makemeahanzi
  https://github.com/chanind/hanzi-writer
  https://github.com/chanind/hanzi-writer-data
  https://hanziwriter.org/cn/docs.html
 -->
 <template>
   <div ref="dao"></div>
   <div ref="da"></div>
   <div @click="handleAnimate" class="btn">
      Run
   </div>
   <div ref="wo"></div>
</template>
<script setup>
import { ref, reactive , onMounted } from "vue";
const HanziWriter = require('hanzi-writer');
const dao = ref(null)
const da = ref(null)
const wo = ref(null)

let daoChar = null;
let daChar = null;
let woChar = null;

function init(){
  daoChar = HanziWriter.create(dao.value, '蘇', {
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

  daChar = HanziWriter.create(dao.value, '达', {
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
  // writer.loopCharacterAnimation(); // 循环动画

  // 添加一个 svg 汉字
  HanziWriter.loadCharacterData('到').then(function(charData) {
    var target = dao.value
    for (var i = 0; i < charData.strokes.length; i++) {
      var strokesPortion = charData.strokes.slice(0, i + 1);
      renderFanningStrokes(target, strokesPortion);
    }
  });

  // 从本地读取笔画 只要加入 charDataLoader 参数就不会从网络获取了
  const woData = require('hanzi-writer-data/我');
  woChar = HanziWriter.create(wo.value, '我', {
    charDataLoader: function() {
      return woData;
    } 
  });  
}
function renderFanningStrokes(target, strokes) {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.width = '75px';
  svg.style.height = '75px';
  svg.style.border = '1px solid #EEE'
  svg.style.marginRight = '3px'
  target.appendChild(svg);
  console.log(svg)
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
  daoChar.hideCharacter();
  daChar.hideCharacter();

  daoChar.animateCharacter({
    onComplete: function() {
      setTimeout(function() {
        daChar.animateCharacter();
      }, delayBetweenAnimations);
    }
  }); 
}

onMounted(() => {
  init()
});
</script>
<style lang="scss" scoped>
.btn {
  width: 80px;
  padding: 10px 20px;
  background: #1677ff;
  border-radius: 6px;
  text-align: center;
}</style>
