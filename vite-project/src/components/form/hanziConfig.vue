<template>
  <a-form
    :model="formState"
    v-bind="formItemLayout"
    @finishFailed="onFinishFailed"
    @finish="onFinish"
  >
    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item label="config">
          <span class="ant-form-text">create 配置项</span>
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item name="sourceTxt" label="sourceTxt" >
          <a-input v-model:value="formState.sourceTxt"/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item name="showCharacter" label="showCharacter" 
          extra="布尔值 默认为 true. "
          help="控制第一次渲染显示还是隐藏汉字"
        >
          <a-switch v-model:checked="formState.showCharacter" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item name="showOutline" label="showOutline" 
          extra="布尔值 默认为 true. "
          help="显示当前隐藏汉字的轮廓"
        >
          <a-switch v-model:checked="formState.showOutline" />
        </a-form-item>
      </a-col>

    </a-row>

    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item name="width" label="width" 
          extra="数值 default 0. "
          help="画布的宽度"
        >
          <a-input-number v-model:value="formState.width" :min="0" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item name="height" label="height" 
          extra="数值 default 0"
          help="画布的高度"
        >
          <a-input-number v-model:value="formState.height" :min="0" />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item name="padding" label="padding" 
          extra="数值, 默认 20"
          help="画布的汉字和边缘之间的填充"
        >
          <a-input-number v-model:value="formState.padding" :min="0" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item name="strokeFadeDuration" label="strokeFadeDuration" 
          extra="数值, 默认 400"
          help="调用 writer.show() 和 writer.hide() 时在显示和隐藏笔划之间转换的时间（以毫秒为单位）"
        >
          <a-input-number v-model:value="formState.strokeFadeDuration" :min="1" />
        </a-form-item>
      </a-col>

    </a-row>

    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item name="strokeHighlightSpeed" label="strokeHighlightSpeed" 
          extra=" 数值, 默认 20"
          help="在测验中给出提示时突出显示每个笔划的速度必须大于0。数字越大越快。"
        >
          <a-input-number v-model:value="formState.strokeHighlightSpeed" :min="0" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item name="delayBetweenLoops" label="delayBetweenLoops" 
          extra="数值, 默认 2000"
          help="循环动画时每个动画循环之间的时间（以毫秒为单位）"
        >
          <a-input-number v-model:value="formState.delayBetweenLoops" :min="10" />
        </a-form-item>
      </a-col>

    </a-row>

    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item name="delayBetweenStrokes" label="delayBetweenStrokes" 
          extra="数值, 默认 1000。"
          help="动画进行中每个笔画之间的间隔时间（以毫秒为单位）。"
        >
          <a-input-number v-model:value="formState.delayBetweenStrokes" :min="10" />
        </a-form-item>   
      </a-col>
      <a-col :span="12">
        <a-form-item name="strokeAnimationSpeed" label="strokeAnimationSpeed" 
          extra="数值, 默认 1"
          help="绘制每个笔划的速度必须大于0,数字越大越快。"
        >
          <a-input-number v-model:value="formState.strokeAnimationSpeed" :min="0" />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item name="strokeColor" label="strokeColor" has-feedback
          extra="十六进制字符, 默认 '#555'"
          help="绘制每个笔划的颜色。"
        >
          <a-radio-group v-model:value="formState.strokeColor">
            <a-radio-button :value="item.value" v-for="item in colors">{{item.label}}</a-radio-button>
          </a-radio-group>
          <!-- <a-select v-model:value="formState.strokeColor">
            <a-select-option :value="item.value" v-for="item in colors">{{item.label}}</a-select-option>
          </a-select> -->
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item name="radicalColor" label="radicalColor" 
          extra="十六进制字符, 默认 null"
          help="如果存在偏旁部首数据，则在笔划中绘制偏旁部首的颜色。 如果没有设置，激光将绘制与其他笔划相同的颜色。"
        >
          <a-radio-group v-model:value="formState.radicalColor">
            <a-radio-button :value="item.value" v-for="item in colors">{{item.label}}</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item name="highlightColor" label="highlightColor" 
          extra="十六进制字符, 默认 '#AAF'"
          help="用于在测验中突出显示的颜色。"
        >
        <a-radio-group v-model:value="formState.highlightColor">
          <a-radio-button :value="item.value" v-for="item in colors">{{item.label}}</a-radio-button>
        </a-radio-group>  
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item name="outlineColor" label="outlineColor" 
          extra="十六进制字符, 默认 '#DDD'。 "
          help="字符轮廓的颜色。"
        >
          <a-radio-group v-model:value="formState.outlineColor">
            <a-radio-button :value="item.value" v-for="item in colors">{{item.label}}</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item name="drawingColor" label="drawingColor" 
      extra="十六进制字符, 默认 '#333'。"
      help="测验期间绘制的线条颜色。"
    >
      <a-radio-group v-model:value="formState.drawingColor">
        <a-radio :value="item.value"  v-for="item in colors">{{ item.label }}</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item label="charDataLoader" name="charDataLoader"
      extra="函数"
      help="自定义函数 加载字符数据"
    >
      <span class="ant-form-text">
        data 从本地读取笔画 只要加入 charDataLoader 参数就不会从网络获取了
        charDataLoader: function() {
          return data;
        } 
      </span>
    </a-form-item>


  </a-form>
</template>
<script setup>
import { reactive, watch, watchEffect } from 'vue';


// 定义组件事件
const emit = defineEmits([
  'createText',
  'updateDimensions',
  'updateColor',
  'showCharacter',
  'hideCharacter',
  'showOutline',
  'hideOutline',
  'animateCharacter'
])

// 显示暴露子组件属性方法 -- 父组件使用
defineExpose({
  init,
})

const formItemLayout = {
  labelCol: { span: 6, },
  wrapperCol: { span: 10, },
};

const colors = [
  { label:'黑色', value :'#000000'},
  { label:'绿色', value :'#008000'},
  // { label:'蓝色', value :'#4096ff'},
  { label:'灰色', value :'#dddddd'},
]

const formState = reactive({
  sourceTxt:'只',
  showOutline: false,
  showCharacter: true,
  width: 30,
  height: 30,
  padding: 4,
  strokeAnimationSpeed: 1,
  delayBetweenStrokes: 100,

  strokeHighlightSpeed: 20,
  strokeFadeDuration: 400,
  
  delayBetweenLoops: 2000,
  strokeColor: '#000000',
  radicalColor: '#000000',
  highlightColor: '#dddddd',
  outlineColor: '#dddddd',
  drawingColor: '#000000',
});

// 侦听器 -- watch
// 不能直接侦听响应式对象的属性值,这里需要用一个返回该属性的 getter 函数：

// 一个值
watch(
  ()=> formState.showCharacter,
  (flag)=>{
    flag? emit('showCharacter') : emit('hideCharacter')
  }
)
// 多个距离值修改
watch(
  [
    ()=> formState.width,
    ()=> formState.height,
    ()=> formState.padding,
  ],
  ([width,height,padding])=>{
    emit('updateDimensions', width, height, padding )
  },
  // { deep: true }
  // { immediate: true }
)
// 侦听器 -- watchEffect 简化，参数使用的是函数
// q: 会立即执行
// 一个值
watchEffect(()=>{
  formState.showOutline ? emit('showOutline') : emit('hideOutline')
})

// 多个颜色属性值更改
watchEffect(()=>{
  emit('updateColor',{
    strokeColor: formState.strokeColor,
    radicalColor: formState.radicalColor,
    highlightColor: formState.highlightColor,
    outlineColor: formState.outlineColor,
    drawingColor: formState.drawingColor,
  })
})

// 输入内容更改
watch(
  ()=>formState.sourceTxt,
  ()=>{
    emit('createText', formState )
  }
)

// 笔画时间更改
watch(
  [
    ()=> formState.strokeAnimationSpeed,
    ()=> formState.delayBetweenStrokes,
  ],
  ()=>{
    emit('animateCharacter', formState)
  }
)

// 提交表单
const onFinish = values => {
  console.log('Success:', values);
  
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

// 初始化
function init(){
  // 创建
  emit('createText', formState )
  // 创建 + 动画
  // emit('animateCharacter', formState)
}
</script>