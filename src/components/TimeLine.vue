<template>
    
         <n-scrollbar x-scrollable>
            <div style="white-space: nowrap; padding: 12px">
                <n-timeline horizontal>
                    <n-timeline-item v-for="item in timelines" :key="item.type" v-bind="item" />
                </n-timeline>
            </div>
         </n-scrollbar>
  
</template>
<script setup>
const timelines= [
  { type: 'default', title: '项目设计', content: '', time: '2021-12-09 ' },
  { type: 'success', title: '需求分析', content: '', time: '2021-12-15' },
  { type: 'error', title: '开题答辩', content: '', time: '2021-12-19 ' },
  { type: 'warning', title: '开发', content: '', time: '2022-01-10 ' },
  { type: 'info', title: '项目完成', content: '', time: '2022-04-10 ' }
];
</script>
<style scoped >

</style>

