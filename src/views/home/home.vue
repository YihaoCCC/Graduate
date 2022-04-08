<template>
	<div class="totalBox">
        <div class="OverView">
            <div class="header">
                <div class="title">
                    <span>
                        OverView
                    </span>
                    <span>
                        >
                    </span>
                </div>
                <div class="header-right">
                    <button class="today">
                        TODAY
                    </button >
                    <button class='mounth'>
                        MOUNTH
                    </button >
                    <button class='year'>
                        YEAR
                    </button>
                    <button class="sign" @click="signClick">
                        今日签到
                    </button>
                </div>
            </div>
            <div class="myCard welcomeHeadedr">
                <welcome-header :time="timeOfHour" :name='user.name' :statisticData="statisticData"></welcome-header>
            </div>
            <div class="overview-content">
                <div class="item-box ">
                    <div class="className">
                        {{ user.dept?.deptName }}
                    </div>
                    <div class="name">
                        <span>
                            {{user.name}}
                        </span>
                    </div>
                    <div class="login-time">
                        {{lastLoginTime}}
                    </div>
                </div>
                <div class="item-box">
                    <div class="today">
                        {{today}}
                        <span>
                            <em style="margin-right: 20px">
                                {{yearZodiac}}
                            </em>
                            {{lunar}}
                        </span>
                    </div>   
                    <div class="time">
                        <span>
                            已入职：
                        </span>
                        {{showOnboarding.toFixed(0)}}
                        <em>
                            天
                        </em>
                    </div>
                </div>
                <div class="item-box">
                    <div class="sign-time">
                        {{showSign.toFixed(0)}}
                    </div>
                    <div class="rate">
                        {{showSignPercent.toFixed(2) + '%'}}
                    </div>
                </div>
                 <div class="ShortCut  myCard">
                     <div style="width: 100%"><h3 style="margin: 6px 0px 10px 10px ">快捷选项</h3></div>
                    <div v-for="item in shortcuts" :key="item.id" class="iconbox" >
                        <short-cut-card v-bind="item"   />
                    </div>
                </div> 
            </div>

        </div>
        <div class="statistics">
            <div class="second-header">
                <span>
                    Statistics
                </span>
                <span>
                    >
                </span>
            </div>
            <div class="second-content">
                <div class="leftgragh">
                   <div class="myCard">
                       <div id="container" style="min-width:400px;height:400px;border-radius:20px"></div>
                   </div>
                </div>
                <div class="center">
                    <div class="top">

                        <p> 项目情况: {{currentProject.name}} </p>
                        <div class="myCard centerFlex">
                            
                            <time-line :timelines="TimeLine"></time-line>

                        </div>
                    </div>
                    <div class="top">
                        <div class="ProjectDetail">
                            <span style="margin-left: 6px; font-size:18px;font-wieght:bloder">{{currentProject.name}} <em style="font-size:16px">项目进度</em> </span>
                            <button class="learn-more" @click="showChange">
                                <span class="circle" aria-hidden="true">
                                <span class="icon arrow"></span>
                                </span>
                                <span class="button-text">切换项目</span>
                            </button>
                        </div>
                        <div class="myCard centerFlex">
                            <step-project :isLoading='ProjectLoading' :currentPorject='currentProject'></step-project>
                        </div>
                    </div>
                    
                    
                </div>
                <div class="rightCard">
                <el-card shadow="hover" >
                    <template #header>
                        <div class="clearfix">
                            <span>我的待办事项</span>
                            <el-button style="float: right;" size="small"  type="warning" round plain @click="addItem">添加待办</el-button>
                        </div>
                    </template>

                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template #default="scope">
                                <el-checkbox v-model="scope.row.state"  @change='changeDaiBan(scope.row)'></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template #default="scope">
                                <div
                                    class="todo-item"
                                    :class="{
                                        'todo-item-del': scope.row.state,
                                    }"
                                >{{ scope.row.content }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template #default="scope">
								<svg t="1645532866396" class="icon" @click="editItem(scope.row)" :class="{
                                        'todo-item-del': scope.row.state,
                                    }" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3078" width="16" height="16"><path d="M848.937379 537.578518a38.363045 38.363045 0 0 0-38.387037 38.387037c0 1.495495 0.111962 2.879028 0.215927 4.262561h-0.215927V947.040246H76.934078V213.423982h400.92861c21.224833 0 38.387037-17.170202 38.387037-38.387037 0-21.224833-17.162204-38.387037-38.387037-38.387037H76.934078a76.72609 76.72609 0 0 0-76.774074 76.774074V947.040246c0 42.441668 34.332406 76.774074 76.774074 76.774074h733.616264c42.441668 0 76.774074-34.332406 76.774074-76.774074V580.228116h-0.20793c0.103965-1.383533 0.20793-2.767066 0.20793-4.262561 0-21.216835-17.162204-38.387037-38.387037-38.387037z" p-id="3079" fill="#409EFF"></path><path d="M1001.101994 107.107885L916.546547 22.552438c-29.965881-29.965881-78.805388-29.749954-108.763271 0.215927l-423.536975 423.536975a34.100485 34.100485 0 0 0-7.25355 10.876327L270.572688 708.184906c-5.965985 14.075247-1.80739 28.262456 7.25355 37.427361 9.06094 9.172902 23.352114 13.331498 37.531326 7.357515l251.115201-106.308101c4.054631-1.703425 7.677407-4.158596 10.876327-7.25355l423.536975-423.536975c29.965881-29.957883 30.181808-78.797391 0.215927-108.763271zM528.837474 579.164475l-146.510525 62.059043 62.059043-146.510525L741.669602 197.429384l84.451481 84.451481L528.837474 579.164475z m417.666957-417.674955l-66.105677 66.113674-84.451481-84.451481 66.105677-66.113674 0.215927-0.20793 84.451481 84.451482-0.215927 0.207929z" p-id="3080" fill="#409EFF"></path></svg>
                                <svg t="1645532903328" class="icon"  @click="deleteItem(scope.$index,scope.row)" :class="{
                                        'todo-item-del': !scope.row.state,
                                    }" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3987" width="16" height="16"><path d="M608 768c-17.696 0-32-14.304-32-32L576 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C640 753.696 625.696 768 608 768z" p-id="3988" fill="#F56C6C"></path><path d="M416 768c-17.696 0-32-14.304-32-32L384 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C448 753.696 433.696 768 416 768z" p-id="3989" fill="#F56C6C"></path><path d="M928 224l-160 0L768 160c0-52.928-42.72-96-95.264-96L352 64C299.072 64 256 107.072 256 160l0 64L96 224C78.304 224 64 238.304 64 256s14.304 32 32 32l832 0c17.696 0 32-14.304 32-32S945.696 224 928 224zM320 160c0-17.632 14.368-32 32-32l320.736 0C690.272 128 704 142.048 704 160l0 64L320 224 320 160z" p-id="3990" fill="#F56C6C"></path><path d="M736.128 960 288.064 960c-52.928 0-96-43.072-96-96L192.064 383.52c0-17.664 14.336-32 32-32s32 14.336 32 32L256.064 864c0 17.664 14.368 32 32 32l448.064 0c17.664 0 32-14.336 32-32L768.128 384.832c0-17.664 14.304-32 32-32s32 14.336 32 32L832.128 864C832.128 916.928 789.056 960 736.128 960z" p-id="3991" fill="#F56C6C"></path></svg>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </div>
            </div>
            
        </div>
        <el-dialog
            v-model="dialogVisible"
            title="我的待办事项"
            width="30%"
        >
            <span v-if="oldItem">正在修改：“{{oldItem.content}} ”的待办事项</span>
            <span v-else>
                添加新的待办事项
            </span>
            <el-divider />
            <el-input v-model="newItem" />
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmAddItem">确认</el-button>
            </span>
            </template>
        </el-dialog>
        <n-modal
            v-model:show="showChangeProject"
            :mask-closable="false"
            preset="dialog"
        >
            <template #header>
                <div>请选择其中一个项目</div>
            </template>
                <div>
                     <n-select placeholder="请选择项目" v-model:value="ChangeProjectValue" :options="options" />
                </div>
            <template #action>
                <div>
                    <n-button @click="onPositiveClick">
                        确认
                    </n-button>
                    
                </div>
            </template>
        </n-modal>
    </div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Highmaps from 'highcharts/modules/map';
import {  getCurrentInstance, onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ElMessage } from 'element-plus'
import ShortCutCard from '../../components/ShortCutCard.vue'
import WelcomeHeader from '../../components/WelcomeHeader.vue'
import TimeLine from '../../components/TimeLine.vue'
import StepProject from '../../components/StepProject.vue';
import { ElNotification } from 'element-plus'
import yhRequest from '../../utils/yhRequest';
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);
export default {
    components: {
        ShortCutCard,
        WelcomeHeader,
        TimeLine,
        StepProject,
        StepProject
    },
    // 默认是reactive 不是ref 直接用
    data () {
        return {
            userId: localStorage.getItem('USERID'),
            user: {},
            mouthDay: 0,
            showSign : 0,
            showOnboarding: 0,
            showSignPercent: 0,
            projectList: [],
            currentProject: {},
            TimeLine:[],
            statisticData: []
        }
    },
    methods: {
        newTimeLines(begin,end) {
        let timelines= [ 
                { type: 'default', title: '项目开始时间', content: '', time: begin },
                { type: 'success', title: '需求分析', content: '', },
                { type: 'error', title: '开发', content: '', },
                { type: 'warning', title: '系统测试', content: '',  },
                { type: 'info', title: '项目交付时间', content: '', time: end }
            ]
            return timelines
        },
        getInfo() {
            const p = this.$yhRequest.get(`/api/user/queryByUserId/${this.userId}`).then((res) => {
            this.user = res.obj
            console.log(this.user)
            this.sign = res.obj.signInDay
            this.mouthDay = res.obj.mouthDay
            return [this.sign,res.obj.workDay,res.obj.monthDay]
        })
        p.then(res => {
            gsap.to(this, {
                duration: 2,
                showSign: res[0]
            })
            gsap.to(this, {
                duration: 3,
                showOnboarding: res[1]
            })
            gsap.to(this, {
                duration: 3,
                showSignPercent: (res[0]/res[2])*100
            })
        })
        },
        getDaiBan() {
            this.$yhRequest.get(`/api/daiban/queryByUserId/${this.userId}`).then((res) => {
                res.map(item => {
                    item.state = item.state === 1 ? true : false
                })
                this.todoList = res
                this.statisticData = this.collectDaibanProject(this.projectList.length,this.todoList.length)
            })
        },
        changeDaiBan(item) {
            if(item?.state === undefined) {
                this.oldItem.content = this.newItem
                this.oldItem.state = this.oldItem.state ? 1 : 0
                this.$yhRequest.put('/api/daiban/update', this.oldItem).then(res => {
                    ElMessage({
                            message: '修改成功！',
                            type: 'success'
                    })
                    this.getDaiBan()
                })
            } else {
                 const copyItem = JSON.parse(JSON.stringify(item))
                copyItem.state =  item.state ? 1 : 0
                this.$yhRequest.put('/api/daiban/update', copyItem).then(res => {
                    // this.getDaiBan()
                })
            }
        },
        getProject() {
            return this.$yhRequest.get(`/api/project/queryByUserId/${this.userId}`).then(res => {
                this.projectList = res
                if(res.length > 0) {
                    this.currentProject = res[0]
                    this.TimeLine =  this.newTimeLines(this.currentProject?.beginDate,this.currentProject?.endDate)
                    return this.initChartData()
                } else {
                    return [[]]
                }
            })
            
        },
        initChartData() {
            let chartData = []
            const chartDataNumber = 1
            this.projectList.forEach((item) => {
                chartData.push([item.name,chartDataNumber])
            })
            return chartData
        },
        collectDaibanProject( proNum, todoNum ) {
            return [
                    {
                        id: 0,
                        label: '在组项目数',
                        value:  proNum
                    },
                    {
                        id: 1,
                        label: '我的待办',
                        value: todoNum 
                    },
                    {
                        id: 2,
                        label: '我的消息',
                        value: '12'
                    }
            ];
        }
    },
    mounted() {
        
        this.getInfo()
        this.getProject().then(res => {
            this.getDaiBan()
            // HighCharts饼图
            Highcharts.chart('container', {
                    chart: {
                            type: 'pie',
                            options3d: {
                                    enabled: true,
                                    alpha: 45
                            }
                    },
                    credits: {
                            enabled: true,                    // 默认值，如果想去掉版权信息，设置为false即可
                            text: '小奕办公系统',             // 显示的文字
                            href: 'http://www.hcharts.cn',      // 链接地址
                            position: {                         // 位置设置 
                                align: 'left',
                                x: 300,
                                verticalAlign: 'bottom',
                                y: -20
                            },
                            style: {                            // 样式设置
                                cursor: 'pointer',
                                color: '#666',
                                fontSize: '12px'
                            }
                    },
                    title: {
                            text: '我参与的项目',
                    },
                    subtitle: {
                            text: '本阶段的任务饼图'
                    },
                    plotOptions: {
                            pie: {
                                    innerSize: 100,
                                    depth: 45
                            }
                    },
                    series: [{
                            data: res
                    }]
        });
        })
    },
    setup() {
        let { proxy } = getCurrentInstance();
        const shortcuts = [
            { id: 0, label: '系统主页', icon: 'mdi:desktop-mac-dashboard', iconColor: '#409eff', goWhere: '/' },
            { id: 1, label: '我要请假', icon: 'ic:outline-settings', iconColor: '#7238d1', goWhere: '/leave' },
            { id: 2, label: '我要报销', icon: 'mdi:family-tree', iconColor: '#f56c6c', goWhere: '/reim' },
            { id: 3, label: '会议室', icon: 'mdi:table-large', iconColor: '#fab251', goWhere: '/offline_meeting' },
            { id: 4, label: '我的消息', icon: 'fluent:app-store-24-filled', iconColor: '#19a2f1', goWhere: '/message' },
            { id: 5, label: '个人中心', icon: 'mdi:chart-areaspline', iconColor: '#8aca6b', goWhere: '/profile' }
        ];
        
        const timeOfHour = ref(null)
        const lastLoginTime = ref(null)
        const oldItem = ref(null)
        const newItem = ref('')
        let CurrentInstance = getCurrentInstance()
        let $yhRequest = CurrentInstance.appContext.config.globalProperties.$yhRequest
        const today = ref('')
        const lunar = ref('')
        const yearZodiac = ref('')
        const sign = ref()
        const Onboarding = ref(1886)
        const todoList= ref()
        const addItem = () => {
            oldItem.value = null
            newItem.value = null
            dialogVisible.value = true
        }
        const ProjectLoading = ref(false)
        const showChange = () => {
            showChangeProject.value = true
            let currentOptions = []
            proxy.projectList.forEach((item,index) => {
                currentOptions.push({
                    label: item.name,
                    value: index
                })
            })
            options.value = currentOptions
            
        }
        const middleId = ref(null)
        
        const confirmAddItem = () => {
            if(newItem.value) {
                if(!oldItem.value) {
                    yhRequest.post('/api/daiban/add', {
                        userId: proxy.userId,
                        content: newItem.value
                    }) .then(res => {
                        proxy.getDaiBan()
                        newItem.value = null
                        ElMessage({
                            message: '添加待办成功！',
                            type: 'success'
                        })
                        dialogVisible.value = false
                    }) 
                } else {

                    proxy.changeDaiBan(proxy.oldItem.value)
                    dialogVisible.value = false
                }
            } else {
                 ElMessage({
                    message: '不可为空！',
                    type: 'warning',
                })
            }
        }
        const editItem = (item) => {
            if(!item.state) {
                dialogVisible.value = true
                oldItem.value = item
                // middleId.value = item.id
            } else {
                ElMessage({
                    message: '当前待办已完成，不可修改！',
                    type: 'error'
                })
            }
            
        }
        const deleteItem= (index,item) => {
            if(item.state) {
                yhRequest.delete(`/api/daiban/delete/${item.id}`).then(res => {
                   if(res.code === 200 ) {
                        proxy.getDaiBan()
                        ElMessage({
                            message: '删除成功',
                            type: "success"
                        })
                   }
                })
            } else {
                ElMessage({
                    message: '当前待办未完成，不可删除',
                    type: "error"
                })
            }
        }
        const dialogVisible = ref(false)
        const showChangeProject = ref(false)
        const ChangeProjectValue = ref(null)
        const options = ref(null)
        const onPositiveClick = () => {
            proxy.currentProject = proxy.projectList[ChangeProjectValue.value]
            proxy.TimeLine =  proxy.newTimeLines(proxy.currentProject?.beginDate,proxy.currentProject?.endDate)
            showChangeProject.value = false
            ProjectLoading.value = true
            setTimeout(() => {
                ProjectLoading.value = false
                ElNotification({
                            title: '切换成功!',
                            message: '项目溯源成功！请查看',
                            type: 'success',
                })
            },2000)
        }
        const signClick = () => {
            yhRequest.post('/api/signIn/add', {
                userId: localStorage.getItem("USERID")
            }).then(res => {
                if( res.code === 200 ) {
                    proxy.getInfo()
                    ElNotification({
                            title: '签到成功!',
                            message: '今日签到成功！请查看',
                            type: 'success',
                })
                } else {
                    ElNotification({
                        title: res.message,
                        type: 'warning',
                })
                }
            })
        }
            $yhRequest.get('https://api.muxiaoguo.cn/api/yinlongli?api_key=cef2258d2716a7a3').then((res) => {
                console.log(res.data)
                today.value = res.data.gregorian
                today.value = today.value.split(' ')[0]
                lastLoginTime.value = res.data.gregorian
                lunar.value = res.data.lunar
                yearZodiac.value = res.data.yearZodiac
                timeOfHour.value = parseInt(res.data.gregorian.split(' ')[1].split(':')[0])
            })
            return {
                todoList,
                today,
                lunar,
                yearZodiac,
                sign,
                Onboarding,
                signClick,
                addItem,
                deleteItem,
                newItem,
                dialogVisible,
                oldItem,
                editItem,
                shortcuts,
                timeOfHour, // 小时时间 
                confirmAddItem,
                lastLoginTime, // 上次登录时间
                showChangeProject, // 更改项目模态框
                showChange,
                ChangeProjectValue, // 更改项目后选择框的值
                options, // 更改项目的选项
                onPositiveClick,
                ProjectLoading
            }
    }
}
</script>

<style lang="less" scoped="scoped">
@import url('./home.less');
.test {
    width: 400px;
    height: 400px;
}

</style>
