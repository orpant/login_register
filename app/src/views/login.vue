<script setup>
import { useRouter } from 'vue-router'
import { reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import {login } from '../api/user'
const router = useRouter()
const formData = reactive({
    username: '200',
    password: '200',
});

const clickRegister = () => {
  router.push('/register');
};
const onReset = () => {
  MessagePlugin.success('重置成功');
};

const onSubmit = ({ validateResult, firstError }) => {
  // 判断账号密码是否为空
  if(formData.username === '' || formData.password === ''){
    MessagePlugin.error('账号或密码不能为空');
    return;
  }
  // 判断账号密码格式是否正确
  if( !/^[\u4E00-\u9FA5A-Za-z0-9]{3,5}$/.test(formData.username)|| !/^[\u4E00-\u9FA5A-Za-z0-9]{3,5}$/.test(formData.password)){
       MessagePlugin.error('账号或密码格式不正确');
       return;
  }
  login({
    username: formData.username,
    password: formData.password,
  }).then(res=>{
    if(res.code == 200){
      MessagePlugin.success('登录成功');
      localStorage.setItem('token', res.token);
      router.push('/home');
    }else if(res.data.code == 402){
      MessagePlugin.error('账户还未注册');
    }else if(res.data.code == 403){
      MessagePlugin.error('请检查账户或密码');
    }
  }).catch(err=>{
    console.log(err);
    MessagePlugin.error("登录失败,请重新尝试");
  })
};
</script>

<template>
  <div style="width: 350px">
    <t-form ref="form" :data="formData" :colon="true" :label-width="0" @reset="onReset" @submit="onSubmit">
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

      <t-form-item>
        <t-button theme="primary" type="submit" block>登录</t-button>
        <t-button theme="primary" type="submit" block style="margin-left: 10px;" @click="clickRegister">注册</t-button>
      </t-form-item>
    </t-form>
  </div>
 
</template>

<style scoped>

</style>

