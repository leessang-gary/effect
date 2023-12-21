<template>
  <a-form
    :model="formState"
    ref="formRef"
    name="normal_login"
    :rules="rules"
    v-bind="layout"
    class="loginForm"
    @finish="onFinish"
    @validate="handleValidate"
    @finishFailed="onFinishFailed"
  >
    <a-form-item >
      <a-radio-group v-model:value="formState.radioIndex">
        <a-radio-button value="1">登录</a-radio-button>
        <a-radio-button value="2">注册</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="手机号" name="mobilePhone" has-feedback>
      <a-input 
        v-model:value="formState.mobilePhone" placeholder="13位手机号">
        <template #prefix> <PhoneOutlined /> </template>
      </a-input>
    </a-form-item>
    <a-form-item label="用户名" name="username" v-if="!isLogin">
      <a-input v-model:value="formState.username" >
        <template #prefix> <UserOutlined /> </template>
        <template #suffix> <ReloadOutlined  @click="reSetUserName"/> </template>
      </a-input>
    </a-form-item>

    <a-form-item label="密码" name="password" has-feedback>
      <a-input-password v-model:value="formState.password" placeholder="6-16位数字或者字母">
        <template #prefix> <LockOutlined /> </template>
      </a-input-password>
    </a-form-item>

    <a-form-item>
      <a-button :disabled="disabled" type="primary" html-type="submit" class="login-button">
        {{isLogin? 'Log in':'register now!'}}
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { computed , ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { PhoneOutlined, LockOutlined, UserOutlined, ReloadOutlined } from '@ant-design/icons-vue';
import Api from '@/api'

import { useLoginStore } from '@/store/user'
import { checkPhone, checkPass } from '@/utils/validate';
import tools from '@/utils/tools.js'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const loginStore = useLoginStore()

const formRef = ref();
const formState = reactive({
  radioIndex: '2',
  mobilePhone:'13812341233',
  username: '',
  password: '111111',
});
const layout = {
  labelCol: { span: 4, },
  wrapperCol: { span: 1000, },
}


const validateTel = async (_rule, value) => {
  if(!checkPhone(value)){
    return Promise.reject('请输入正确的手机号！')
  } else {
    return Promise.resolve();
  }
};
const validatePass = async (_rule, value) => {
  if (!checkPass(value)) {
    return Promise.reject('请输入6-16位数字或者字母');
  } else {
    return Promise.resolve();
  }
};

// 表单验证
const rules = {
  mobilePhone: [
    { required: true, validator: validateTel, trigger: 'blur',}
  ],
  password:[
    { required: true, validator: validatePass, trigger: 'blur',}
  ]
}

// 表单提交
const onFinish = async values => {
  console.log('Success:', values, isLogin);
  if(isLogin.value){
    const res = await Api.userApi.login({
      mobilePhone: formState.mobilePhone,
      password: formState.password,
    })
    // console.error(res)
    if(res.code == 0){
      const token = res.data.token;
      loginStore.setToken(token)
      localStorage.setItem('token', token)
      toPage()
    } else {
      message.error(res.data)
    }
  } else {
    const res = await Api.userApi.addUser({
      mobilePhone: formState.mobilePhone,
      password: formState.password,
      username: formState.username,
    })
    if(res.code == 0){
      message.success(res.data)
      toPage()
    } else {
      message.error(res.data)
    }
  }
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
  message.error('输入正确的信息')
};

// 跳转页面
const toPage = ()=>{
  router.replace({  path:'/', })
}

const handleValidate = (...args) => {
  console.log(args);
};
// computed 的使用
const isLogin = computed(()=>{
  return formState.radioIndex == '1'
})
const disabled = computed(() => {
  return !(formState.mobilePhone && formState.password);
});

// 自动生成一个名字
const reSetUserName = ()=>{
  formState.username = tools.autoGenerationName()
}

onMounted(async()=>{
  init()
})

function init(){
  reSetUserName(); 
}
</script>
<style lang="scss" scoped>
.loginForm {
  .login-button {

  }
  .register-button {
    margin-left: 10px;
  }
}
</style>
