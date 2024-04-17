<script setup>
import { useRouter } from 'vue-router'
import { reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import {register} from '../api/user';
const router = useRouter()
const formData = reactive({
    username: '',
    password: '',
    confirmPassword: ''
});
const rules = {
  username: [
    { required: true, message: '请输入账户名', trigger: 'blur' },
    { min: 3, max: 5, message: '账户名长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 8, message: '密码长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { min: 3, max: 8, message: '密码长度在 3 到 5 个字符', trigger: 'blur' }
  ]
};
const onReset = () => {
  MessagePlugin.success('重置成功');
};

const onSubmit = async ({ validateResult, firstError }) => {
  // 判断账号密码是否为空
  if (formData.username === '' || formData.password === '') {
    MessagePlugin.error('账户名或密码不能为空');
    return;
  }
  // 判断两次密码是否一致
  if (formData.password !== formData.confirmPassword) {
    MessagePlugin.error('两次密码输入不一致');
    return;
  }
  // 判断密码格式是否正确
  if (!/^[\u4E00-\u9FA5A-Za-z0-9]{3,5}$/.test(formData.username)||!/^[\u4E00-\u9FA5A-Za-z0-9]{3,5}$/.test(formData.password)) {
    MessagePlugin.error('密码格式不正确');
    return;
  }
  
  // 调用注册接口
  try {
    const res = await register({
      username: formData.username,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    });
    console.log(res);
    if (res.data.code === 200) {
      MessagePlugin.success('注册成功，请登录');
      localStorage.setItem('token', res.token)
      router.replace('/login')
    } else {
      MessagePlugin.error('注册失败，请重试');
    }
  } catch (error) {
    console.error(error);
    MessagePlugin.error('注册失败，请重试');
  }
};

</script>

<template>
  <div style="width: 350px">
    <t-form ref="form" :data="formData" :colon="true" :label-width="0" @reset="onReset" @submit="onSubmit" :rules="rules">
      <t-form-item name="username">
        <t-input v-model="formData.username" clearable placeholder="请输入账户名">
          <template #prefix-icon>
            <desktop-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>

      <!-- 确认密码 -->

      <t-form-item name="confirmPassword">
        <t-input v-model="formData.confirmPassword" type="password" clearable placeholder="请确认密码">
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item>
        <t-button theme="primary" type="submit" block @click="clickLogin">注册</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>

<style scoped>

</style>

