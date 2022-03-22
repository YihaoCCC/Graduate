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
                <n-card hoverable  title="项目进度详情">
                    <template #header-extra>
                        <a class="text-primary" href="javascript:;">更多项目</a>
                    </template>
                    {{One?.name || null}}
                    <el-progress :percentage="One?.jindu || 66" color="#42b983"></el-progress>
                    {{Two?.name || null}}
                    <el-progress :percentage="Two?.jindu || 66" color="#f1e05a"></el-progress>项目三
                    <el-progress :percentage="13.7"></el-progress>项目四
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
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
import { theme } from 'highcharts'
export default {
  components: { ProjectTable },
    setup() {
        const project = ref(null)
        const One = ref(null)
        const Two = ref(null)
        const Three = ref(null)
        const Four = ref(null)
        const getProject = () => {
            yhRequest.get(`/api/project/queryByUserId/${localStorage.getItem('USERID')}`).then(res => {
                project.value = res
                console.log('idnex')
                console.log(project.value)
                if(res[0]) {
                    One.value = res[0]
                } else if(res[1]) {
                    Two.value = res[1]
                } else if(res[2]){
                    Three.value = res[2]
                } else if(res[3]) {
                    Four.value = res[3]
                }
                
            })
        }
        onMounted(() => {
            getProject()
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
            One,
            Two,
            Three,
            Four
        }
    }
}
</script>
<style scoped lang='scss'>
@import url('./profile.scss');

</style>
