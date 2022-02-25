<template>
  <div class="notFound">
    <div class="imgBox">
      <img src="../../assets/404.svg" alt="">
    </div>
     <button class="btn" @click="GoIndex">回到主页</button>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()
    const GoIndex = () => {
        router.push('/home')
    }
</script>

<style scoped lang='scss'>
@import './404.scss';
</style>