<script setup>
import {getInfo} from '../../api/user'
const getData = async () => {
  const res = await getInfo()
}
</script>

<template>
  <div>
   <button @click="getData">获取数据</button>
  </div>
</template>

<style scoped>
</style>
