<template>
    
         <n-scrollbar x-scrollable>
            <div style="white-space: nowrap; padding: 12px">
              
                <n-timeline horizontal v-if="timelines.length !== 0">
                    <n-timeline-item v-for="item in timelines" :key="item.type" v-bind="item" />
                </n-timeline>
                <n-alert title="提示" type="warning" v-else>
                    您暂未添加任何您的项目
                </n-alert>
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

