<template>
    <index v-if="isShow"></index>
</template>
<script >
    import index from './index.vue'
    import { ref, provide, nextTick} from 'vue'
    export default {
        components: {index},
        
        setup() {
            const isShow = ref(true)           
            const fresh = () => {
                isShow.value = false
                nextTick(() => {
                    isShow.value = true
                })
            }
            provide('fresh', fresh)
            return {
                isShow
            }
        }
    }
</script>