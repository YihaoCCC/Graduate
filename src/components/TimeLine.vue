<template>
    
         <n-scrollbar x-scrollable>
            <div style="white-space: nowrap; padding: 12px">
              
                <n-timeline horizontal>
                    <n-timeline-item v-for="item in timelines" :key="item.type" v-bind="item" />
                </n-timeline>
            </div>
         </n-scrollbar>
  
</template>
<script  >


export default {
    props: ['timelines'],
    // watch:{
    //     timelines(val) {
    //         console.log('数据变化')
    //         console.log(val)
    //     }
    // }
 
}


</script>
<style scoped >

</style>

