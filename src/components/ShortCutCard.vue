<template>
  <div class="IconBox" @click="itemClick(goWhere)" >
    <Icon :icon="icon" :style="{ color: iconColor }" class="svgStyle" />
    <p >{{ label }}</p>
  </div>
</template>

<script >
import { Icon } from '@iconify/vue';
export default {
    components: {
        Icon
    },
    methods: {
        itemClick(go) {
            this.$router.push(go)
        }
    },
   
    props:{
        /** 快捷操作名称 */
        label: String,
        /** 图标 */
        icon: String,
        /** 图标颜色 */
        iconColor: String,
        goWhere: String
    }
}

</script>
<style lang='scss' scoped>
.IconBox {
    width: 115px;
    height: 86px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    border: 1px solid #e6e6e6;
    transition:  all .1s ease-in-out;
    padding-top: 10px;
    &:hover {
        box-shadow: 0 1px 2px 0 rgba(0 0 0/0.26);
        p {
            transition:  all .2s ease-in-out;
            color: #Faa05a;
        }
    }
    p {
        margin-top: 5px;
    }
    .svgStyle {
        width: 40px;
        height: 39px;
        path {
            width: 100%;
            height: 100%;
        }

    }

}
</style>