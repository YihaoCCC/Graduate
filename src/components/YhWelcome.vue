<template>
    <div class="welcomeTitle " >
        <div class="container animate__animated animate__backInDown animate__slow" >
            <h1 contenteditable> {{welcomeText}} </h1>
        </div>
  </div>
</template>
<script setup>
    import {defineProps} from 'vue'
    defineProps({
        welcomeText:String,
    })
</script>
<style lang="scss" scoped>
.welcomeTitle {
  position: relative;
  width: 100%;
  height: 98vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(218, 218, 218, 0.253) ;
  .container {
    /**
      倒影
    */
    -webkit-box-reflect: below -26px linear-gradient(to bottom, transparent,rgba(0,0,0,0.2));
  }
  h1 {
    margin: 0;
    text-align: center;
    color: #fff;
    font-size: 80px;
    text-transform: uppercase;
    letter-spacing: 20px;
    outline: none;
    
    /**
     文字阴影
    */
    --c: rgb(70, 175, 210);
    text-shadow: 0 0 20px var(--c),
                 0 0 40px var(--c),
                 0 0 80px var(--c),
                 0 0 160px var(--c);
    animation: textChange 2s linear infinite;
  }
  @keyframes textChange {
    to {
      filter: hue-rotate(360deg);
    }
  }
}
</style>