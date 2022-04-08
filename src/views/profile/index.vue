<template>
<div >

        <el-row :gutter="20" >
            <el-col :span="8">
                    <div class="card">
                        <div class="blob"></div>
                        <span class="img">
                            <img src="../../assets/avatar01.svg" class="user-avator" alt />
                        </span>
                        <h2>{{ username }}<span></span></h2>
                        <p>
                        <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="svg">
      
                            <svg  @click="goMessage" style="cursor: pointer" t="1646116536288" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2062" width="35" height="35"><path d="M0 167.736v476.72c0 92.72 68.296 167.728 152.6 167.728h228.904l8 211.816L614.4 812.184h257c84.304 0 152.6-75.016 152.6-167.728v-476.72C1024 75.016 955.704 0 871.4 0h-718.8C68.304 0 0 75.016 0 167.736z m658.6 264.8c0-44.192 32.104-79.48 72.296-79.48 40.208 0 72.304 35.28 72.304 79.472 0 44.192-32.2 79.472-72.304 79.472-40.192 0-72.296-35.28-72.296-79.472z m-220.904 0c0-44.192 32.104-79.48 72.304-79.48s72.296 35.28 72.296 79.472c0 44.192-32.2 79.472-72.296 79.472-40.2 0-72.304-35.28-72.304-79.472z m-216.8 0c0-44.192 32.104-79.48 72.304-79.48s72.304 35.28 72.304 79.472c0 44.192-32.208 79.472-72.4 79.472-40.104 0-72.2-35.28-72.2-79.472z" p-id="2063" fill="#f0f0f0"></path></svg>
                        
                        </el-tooltip>
                           <span style="color:#fff;font-weight:bolder">  {{ dept }}</span>
                        </p>
                    </div>
               
                
            </el-col>
            <el-col :span="16">
                <n-card hoverable  >
                    
                    <div id="projectMain" style="width:1000px;height:200px"></div>
                   
                </n-card>
            </el-col>
        </el-row>
           
        <project-table style="margin-top:20px"></project-table>

          
               
</div>
           
        
</template>
<script>

import ProjectTable from './ProjectTable.vue'
import { useRouter } from 'vue-router'
import { ref } from '@vue/reactivity'
import yhRequest from '../../utils/yhRequest'
import { onMounted } from '@vue/runtime-core'
import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  GridComponent,
  VisualMapComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  DatasetComponent,
  GridComponent,
  VisualMapComponent,
  BarChart,
  CanvasRenderer
]);
export default {
  components: { ProjectTable },
    setup() {
        const project = ref(null)
        const getProject = () => {
            return yhRequest.get(`/api/project/queryByUserId/${localStorage.getItem('USERID')}`).then(res => {
                project.value = res
                console.log(project.value)
              
                let data = res.map(item => {
                    return {
                        name: item.name,
                        type: 'bar',
                        data: [item.jindu]
                    }
                })
                return [data]  
            })
        }
        onMounted(() => {
            getProject().then((res) => {
                var chartDom = document.getElementById('projectMain');
                var myChart = echarts.init(chartDom);
                var option;
                option = {
                    title: {
                        text: '进度一览'
                    },
                    color: [
                        '#dd6b66',
                        '#759aa0',
                        '#e69d87',
                        '#8dc1a9',
                        '#ea7e53',
                        '#eedd78',
                        '#73a373',
                        '#73b9bc',
                        '#7289ab',
                        '#91ca8c',
                        '#f49f42'
                    ],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                        type: 'shadow'
                        }
                    },
                    legend: {},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['项目']
                    },
                    series: res[0] 
                    };
                    option && myChart.setOption(option);
            })
            
        })
        const router = useRouter()
        const goMessage = () => {
            router.push('/message')
        }
        const username = localStorage.getItem('USERNAME')
        const dept = localStorage.getItem('DEPT')
        return {
            goMessage,
            username,
            project,
            dept,
            
        }
    }
}
</script>
<style scoped lang='scss'>
@import url('./profile.scss');

</style>
