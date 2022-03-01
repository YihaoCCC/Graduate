<template>
    <div class="avtarWelcome">
                    <img src="../assets/avatar01.svg" alt="">
                    <div class="title">
                        <p> {{time < 12 ? '早上好！': time < 14 ? '中午好' : '晚上好'}}，{{'SoyBean'}} ,
                        {{time < 12 ? '今天又是充满活力的一天！': time < 14 ? '午休时间到啦，要注意休息哦！' : '晚上早点下班喔！'}} 
                        </p>
                        <span>今日 <span style='color: #666;font-weight: bolder;'>天津</span>  ： <span >{{weather}}{{WD1}}</span> ，当前温度： 
                        <span style="color: #666;font-weight: bolder;">{{temp}}</span> ℃</span>
                        <span>，今日车辆限行：{{limitnumber}}</span>
                    </div>
                </div>
                <n-space :size="24" :wrap="false">
                    <n-statistic v-for="item in statisticData" :key="item.id" class="whitespace-nowrap" v-bind="item"></n-statistic>
                </n-space>
   
</template>

<script>
    import {  getCurrentInstance ,onMounted, ref } from 'vue'
    export default {
        props: {
            time: Number,
        },
        setup() {
            const temp = ref(null)
            const weather = ref(null)
            const limitnumber = ref(null)
            const WD1 = ref(null)
        onMounted(() => {
            let yhRequest = getCurrentInstance().appContext.config.globalProperties.$yhRequest
            yhRequest.get(`https://api.muxiaoguo.cn/api/tianqi?api_key=9352759393aef152&type=1&city=天津`).then((res) => {
               temp.value = res.data.temp
               weather.value = res.data.weather
               limitnumber.value = res = res.data.limitnumber
               WD1.value = res.data.WD

            })
        })
        
        const statisticData = [
                    {
                        id: 0,
                        label: '在组项目数',
                        value: '25'
                    },
                    {
                        id: 1,
                        label: '我的待办',
                        value: '4/16'
                    },
                    {
                        id: 2,
                        label: '我的消息',
                        value: '12'
                    }
            ];
            return {
                statisticData,
                temp,
                weather,
                limitnumber,
                WD1
            }
        }
    }
    
</script>
<style lang='scss' scoped>
.avtarWelcome {
        width: 38%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
            width: 60px;
            height: 60px;
            margin-right: 30px;
        }
        .title {
            p {
                font-size: 18px;
                color: #333;
                font-weight: bolder;
                margin: 0 0 10px 0;
            }
            span {
                font-size: 14px;
                color: #999;
            }
        }
}
</style>
