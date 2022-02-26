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
                        today
                    </button >
                    <button class='mounth'>
                        mouth
                    </button >
                    <button class='year'>
                        year
                    </button>
                    <button class="sign" @click="signClick">
                        今日签到
                    </button>
                </div>
            </div>
            <div class="overview-content">
                <div class="item-box ">
                    <div class="className">
                        研发部门
                    </div>
                    <div class="name">
                        <span>
                            陈奕豪
                        </span>
                    </div>
                    <div class="login-time">
                        2022年2月22日
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
                        66%
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
                       <div id="container" style="min-width:400px;height:400px;"></div>
                   </div>
                </div>
                <div class="center">
                    <div class=" myCard top haspadding">
                        <div class="test" id="test"  width='300px' height='300px' >

                        </div>
                    </div>
                    <div class="bottom">
                        <div class="myCard">

                            <el-card class="box-card">
								<template #header>
								<div class="card-header">
									<span>Card name</span>
									<el-button class="button" type="text">Operation button</el-button>
								</div>
								</template>
								<div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
							</el-card>
                            
                        </div>
                        <div class="myCard haspadding">
                            <dv-water-level-pond :config="config2" style="width:150px;height:200px" />
                        </div>
                    </div>
                    
                </div>
                <div class="rightCard">
                <el-card shadow="hover" >
                    <template #header>
                        <div class="clearfix">
                            <span>我的待办事项</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="addItem">添加</el-button>
                        </div>
                    </template>

                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template #default="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template #default="scope">
                                <div
                                    class="todo-item"
                                    :class="{
                                        'todo-item-del': scope.row.status,
                                    }"
                                >{{ scope.row.title }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template #default="scope">
								<svg t="1645532866396" class="icon" @click="editItem(scope.row)" :class="{
                                        'todo-item-del': scope.row.status,
                                    }" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3078" width="16" height="16"><path d="M848.937379 537.578518a38.363045 38.363045 0 0 0-38.387037 38.387037c0 1.495495 0.111962 2.879028 0.215927 4.262561h-0.215927V947.040246H76.934078V213.423982h400.92861c21.224833 0 38.387037-17.170202 38.387037-38.387037 0-21.224833-17.162204-38.387037-38.387037-38.387037H76.934078a76.72609 76.72609 0 0 0-76.774074 76.774074V947.040246c0 42.441668 34.332406 76.774074 76.774074 76.774074h733.616264c42.441668 0 76.774074-34.332406 76.774074-76.774074V580.228116h-0.20793c0.103965-1.383533 0.20793-2.767066 0.20793-4.262561 0-21.216835-17.162204-38.387037-38.387037-38.387037z" p-id="3079" fill="#409EFF"></path><path d="M1001.101994 107.107885L916.546547 22.552438c-29.965881-29.965881-78.805388-29.749954-108.763271 0.215927l-423.536975 423.536975a34.100485 34.100485 0 0 0-7.25355 10.876327L270.572688 708.184906c-5.965985 14.075247-1.80739 28.262456 7.25355 37.427361 9.06094 9.172902 23.352114 13.331498 37.531326 7.357515l251.115201-106.308101c4.054631-1.703425 7.677407-4.158596 10.876327-7.25355l423.536975-423.536975c29.965881-29.957883 30.181808-78.797391 0.215927-108.763271zM528.837474 579.164475l-146.510525 62.059043 62.059043-146.510525L741.669602 197.429384l84.451481 84.451481L528.837474 579.164475z m417.666957-417.674955l-66.105677 66.113674-84.451481-84.451481 66.105677-66.113674 0.215927-0.20793 84.451481 84.451482-0.215927 0.207929z" p-id="3080" fill="#409EFF"></path></svg>
                                <svg t="1645532903328" class="icon"  @click="deleteItem(scope.$index,scope.row)" :class="{
                                        'todo-item-del': !scope.row.status,
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
            <span v-if="oldItem">正在修改：“{{oldItem}} ”的待办事项</span>
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

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);

export default {
    data () {
        return {
            showSign : 0,
            showOnboarding: 0
        }
    },
    mounted() {
        console.log(this.sign)
        gsap.to(this, {
            duration: 2,
            showSign: this.sign
        })
        gsap.to(this, {
            duration: 3,
            showOnboarding: this.Onboarding
        })
    },
    watch: {
        sign(newValue,old) {
            console.log(newValue,old)
            this.showSign = newValue
        }
    },
    setup() {
        const oldItem = ref(null)
        const newItem = ref('')
        let CurrentInstance = getCurrentInstance()
        let $yhRequest = CurrentInstance.appContext.config.globalProperties.$yhRequest
        const today = ref('')
        const lunar = ref('')
        const yearZodiac = ref('')
        const sign = ref(20)
        const Onboarding = ref(1886)
        const todoList= ref([
                {
                    id: 1,
                    title: "今天要修复100个bug",
                    status: false
                },
                {
                    id: 2,
                    title: "小奕办公管理系统",
                    status: false
                },
                {
                    id: 3,
                    title: "今天要写100行代码加几个bug吧",
                    status: false
                },
                {
                    id: 4,
                    title: "今天要写100行代码加几个bug吧今天要写100行代码加几个bug吧今天要写100行代码加几个bug吧今天要写100行代码加几个bug吧今天要写100行代码加几个bug吧",
                    status: false
                },
                {
                    id: 5,
                    title: "今天要修复100个bug",
                    status: true
                },
                {
                    id: 6,
                    title: "今天要写100行代码加几个bug吧",
                    status: true
                },
                {
                    id: 7,
                    title: "今天要写100行代码加几个bug吧",
                    status: false
                },
                {
                    id: 8,
                    title: "今天要写100行代码加几个bug吧",
                    status: true
                },
                {
                    id: 9,
                    title: "今天要写100行代码加几个bug吧",
                    status: true
                },
                {
                    id: 10,
                    title: '这是我的毕业设计',
                    status: false
                }
            ])
        const addItem = () => {
            oldItem.value = null
            newItem.value = null
            dialogVisible.value = true
        }
        const middleId = ref(null)
        const confirmAddItem = () => {
            if(newItem.value) {
                if(!oldItem.value) {
                    todoList.value.push({
                        id: todoList.value.length + 2,
                        title: newItem.value,
                        status: false
                    })
                    newItem.value = null
                    ElMessage({
                        message: '添加待办成功！',
                        type: 'success'
                    })
                    dialogVisible.value = false
                } else {
                    todoList.value.forEach((i) => {
                    if( i.id === middleId.value) {
                        i.title = newItem.value
                    }
                    })
                    ElMessage({
                        message: '修改成功！',
                        type: 'success'
                    })
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
            if(!item.status) {
                dialogVisible.value = true
                oldItem.value = item.title
                middleId.value = item.id
            } else {
                ElMessage({
                    message: '当前待办已完成，不可修改！',
                    type: 'error'
                })
            }
            
        }
        const deleteItem= (index,item) => {
            if(item.status) {
                todoList.value.splice(index,1)
                console.log(todoList.value)
                ElMessage({
                    message: '删除成功',
                    type: "success"
                })
            } else {
                ElMessage({
                    message: '当前待办未完成，不可删除',
                    type: "error"
                })
            }
        }
        const dialogVisible = ref(false)
        const signClick = () => {
            sign.value ++
        }
        onMounted(() => {
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
                            text: '小奕办公系统',
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
                            name: '货物金额',
                            data: [
                                    ['香蕉', 8],
                                    ['猕猴桃', 3],
                                    ['桃子', 1],
                                    ['橘子', 6],
                                    ['苹果', 8],
                                    ['梨', 4],
                                    ['柑橘', 4],
                                    ['橙子', 1],
                                    ['葡萄 (串)', 1]
                            ]
                    }]
            });
            })
            $yhRequest.get('https://api.muxiaoguo.cn/api/yinlongli?api_key=cef2258d2716a7a3').then((res) => {
                console.log(res.data)
                today.value = res.data.gregorian
                today.value = today.value.split(' ')[0]
                lunar.value = res.data.lunar
                yearZodiac.value = res.data.yearZodiac
                console.log(today.value.split(' ')[0])
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
                
                confirmAddItem
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
