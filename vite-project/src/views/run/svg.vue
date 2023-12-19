<!-- svg.js snap.svg.js raphael.js-->
<!-- 看着像是 jquery 的方式  -->
<template>
  <div>
    <div ref="apple"></div>
    <a-upload-dragger
      v-model:fileList="fileList"
      name="file"
      :multiple="true"
      action="http://127.0.0.1:7001/effect/uploadHanZiJson"
      @change="handleChange"
      @drop="handleDrop"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
      <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </a-upload-dragger>
  </div>
</template>
<script setup>
  import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js'
  import { ref, reactive , onMounted } from "vue";
  import { message } from 'ant-design-vue';
  const fileList = ref([])
  const handleChange = info =>{
    const status = info.file.status;
    if(status !=='uploading'){
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  function handleDrop(e) {
    console.log(e);
  }

  const apple = ref(null)
  
  
  function init(){
    
    var draw = SVG().addTo(apple.value).size(300, 300)
    let rect = draw.rect(100, 100)
    rect.animate({
      duration: 2000,
      delay: 1000,
      when: 'now',
      swing: true,
      times: 5,
      wait: 200
    }).attr({ fill: '#f03' })
  }

  onMounted(() => {
    // init()
  });
</script>


