<template>
    <div class="welcome"  id="indexframe" ref="showModel" :class="show ? 'animate__animated animate__fadeOut' : ''">
        <div class="animate__animated animate__backInDown welcomeText animate__slow">
            <h1>
                欢迎来到小奕在线办公服务系统
            </h1>
        </div>
    </div>
    <div
        class="site-wrapper"
        :class="{ 'site-sidebar--fold': sidebarFold }"
        v-loading.fullscreen.lock="loading"
        element-loading-text="拼命加载中"
    >
        <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
            <div class="site-navbar__header">
                <h1 class="site-navbar__brand">
                    <a class="site-navbar__brand-lg">企业在线办公系统</a>
                    <a class="site-navbar__brand-mini">cyh</a>
                </h1>
            </div>
            <div class="site-navbar__body clearfix">
                <el-menu class="site-navbar__menu" mode="horizontal">
                    <el-menu-item class="site-navbar__switch" index="0" @click="handleSwitch">
                        <SvgIcon name="zhedie" class="icon-svg" />
                    </el-menu-item>
                </el-menu>
                <div style="width:80%;height:50px;line-height:18px;display:inline-block;text-align:center">
                    <h5 style="margin: 12px  0 0 0 ">
                        {{yiyan}}
                    </h5>
                </div>
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="contentText"
                    placement="bottom"
                >
                <div style="display:inline-block;"   >
                    <svg  v-show='!fullscreen' @click="kaishi"  t="1646831999509" style="margin: auto;cursor:pointer" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2071" width="32" height="32">
                            <path d="M358.4 768H426.666667v85.333333H213.333333v-213.333333h85.333334v68.266667l128-128 59.733333 59.733333-128 128z m345.6 0l-128-128 59.733333-59.733333 132.266667 132.266666V640h85.333333v213.333333h-213.333333v-85.333333h64zM358.4 298.666667l128 128-59.733333 59.733333-128-128V426.666667H213.333333V213.333333h213.333334v85.333334H358.4z m345.6 0H640V213.333333h213.333333v213.333334h-85.333333V354.133333l-132.266667 132.266667-59.733333-59.733333 128-128z" 
                            fill="#666" p-id="2072"></path>
                    </svg>
                    <svg  v-show='fullscreen' @click="guanbi" t="1646833775043" style="margin: auto;cursor:pointer" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2509" width="32" height="32">
                        <path d="M298.666667 631.466667H226.133333v-81.066667h217.6v204.8h-85.333333v-68.266667l-128 128L170.666667 759.466667l128-128z m422.4 0l128 128-59.733334 59.733333-128-128v68.266667h-85.333333V554.666667h217.6v81.066666h-72.533333zM298.666667 341.333333L187.733333 230.4 243.2 170.666667l115.2 115.2V217.6h85.333333v204.8H226.133333V341.333333H298.666667z m430.933333 0h64v81.066667h-217.6V217.6h85.333333v72.533333L780.8 170.666667l59.733333 59.733333L729.6 341.333333z" 
                        fill="#666666" p-id="2510"></path>
                    </svg>
                </div>
                
                </el-tooltip>
                <el-menu class="site-navbar__menu site-navbar__menu--right" mode="horizontal">
                    
                    <el-menu-item index="1" class="site-navbar__switch">
                        <template #title>
                            <el-badge :value="99"><SvgIcon name="duanxin" class="icon-svg duanxin-svg" /></el-badge>
                        </template>
                    </el-menu-item>
                    <el-menu-item class="site-navbar__avatar" index="3">
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                <img :src="photo" />
                                {{ name }}
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="goProfile">个人中心</el-dropdown-item>
                                    <el-dropdown-item @click="updatePasswordHandle()">修改密码</el-dropdown-item>
                                    <el-dropdown-item @click="logout">退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-menu-item>
                </el-menu>
            </div>
            <update-password v-show="updatePasswordVisible" ref="updatePassword"></update-password>
        </nav>
        <aside class="site-sidebar site-sidebar--dark">
            <div class="site-sidebar__inner">
                <el-menu
                    :default-active="menuActiveName || 'home'"
                    :collapse="sidebarFold"
                    :collapseTransition="false"
                    class="site-sidebar__menu"
                >
                    <el-menu-item index="home" @click="$router.push({ name: 'Home' })">
                        <SvgIcon name="home" class="icon-svg" />
                        <span >主页</span>
                    </el-menu-item>
                    <el-submenu index="组织管理" :popper-class="'site-sidebar--' + sidebarLayoutSkin + '-popper'">
                        <template #title>
                            <SvgIcon name="users_fill" class="icon-svg" />
                            <span >部门管理</span>
                        </template>
                        <el-menu-item
                            index="dept"
                            v-if="isAuth(['ROOT', 'DEPT:SELECT'])"
                            @click="$router.push({ name: 'Dept' })"
                            ref="ABC"
                        >
                            <SvgIcon name="warehouse_fill" class="icon-svg" />
                            <span >部门管理</span>
                        </el-menu-item>
                        <el-menu-item
                            index="role"
                            v-if="isAuth(['ROOT', 'ROLE:SELECT'])"
                            @click="$router.push({ name: 'Role' })"
                        >
                            <SvgIcon name="role_fill" class="icon-svg" />
                            <span >角色管理</span>
                        </el-menu-item>
                        <el-menu-item
                            index="user"
                            v-if="isAuth(['ROOT', 'USER:SELECT'])"
                            @click="$router.push({ name: 'User' })"
                        >
                            <SvgIcon name="service_fill" class="icon-svg" />
                            <span >用户管理</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="在线办公" :popper-class="'site-sidebar--' + sidebarLayoutSkin + '-popper'">
                        <template #title>
                            <SvgIcon name="company_fill" class="icon-svg" />
                            <span >企业办公</span>
                        </template>
                        <el-menu-item
                            index="approval"
                            v-if="isAuth(['ROOT', 'WORKFLOW:APPROVAL', 'FILE:ARCHIVE'])"
                            @click="$router.push({ name: 'Approval' })"
                        >
                            <SvgIcon name="tool_fill" class="icon-svg" />
                            <span >我的审批</span>
                        </el-menu-item>
                        <el-menu-item index="leave" @click="$router.push({ name: 'Leave' })">
                            <SvgIcon name="night_fill" class="icon-svg" />
                            <span  >请假中心</span>
                        </el-menu-item>
                        <el-menu-item index="amect" @click="$router.push({ name: 'Amect' })">
                            <SvgIcon name="cry_fill" class="icon-svg" />
                            <span  >罚款中心</span>
                        </el-menu-item>
                        <el-menu-item index="reim" @click="$router.push({ name: 'Reim' })">
                            <SvgIcon name="money_fill" class="icon-svg" />
                            <span  >报销管理</span>
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="会议管理" :popper-class="'site-sidebar--' + sidebarLayoutSkin + '-popper'">
                        <template #title>
                            <SvgIcon name="meeting_fill" class="icon-svg" />
                            <span  >会议管理</span>
                        </template>
                        <el-menu-item index="meeting-room" @click="$router.push({ name: 'MeetingRoom' })">
                            <SvgIcon name="warehouse_fill" class="icon-svg" />
                            <span  >会议室</span>
                        </el-menu-item>
                        <el-menu-item index="demo-echarts" @click="$router.push({ name: 'OfflineMeeting' })">
                            <SvgIcon name="trust_fill" class="icon-svg" />
                            <span  >线下会议</span>
                        </el-menu-item>
                        <el-menu-item index="demo-echarts" @click="$router.push({ name: 'OnlineMeeting' })">
                            <SvgIcon name="service_fill" class="icon-svg" />
                            <span  >线上会议</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu
                        index="系统设置"
                        :popper-class="'site-sidebar--' + sidebarLayoutSkin + '-popper'"
                        v-if="isAuth(['ROOT'])"
                    >
                        <template #title>
                            <SvgIcon name="config" class="icon-svg" />
                            <span  >系统设置</span>
                        </template>
                        <el-menu-item index="amect-type" @click="$router.push({ name: 'AmectType' })">
                            <SvgIcon name="tool_fill" class="icon-svg" />
                            <span  >罚款类型</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu
                        index="个人中心"
                        :popper-class="'site-sidebar--' + sidebarLayoutSkin + '-popper'"
                        
                    >
                         <template #title>
                            <SvgIcon name="trust_fill" class="icon-svg" />
                            <span >个人中心</span>
                        </template>
                        <el-menu-item index="amect-type" @click="$router.push({ name: 'Profile' })">
                            <SvgIcon name="xingqufill" class="icon-svg" />
                            <span>关于我的</span>
                        </el-menu-item>
                        <el-menu-item index="amect-type" @click="$router.push({ name: 'Message' })">
                            <SvgIcon name="duanxin" class="icon-svg" />
                            <span>消息中心</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </aside>
        <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px' }">
            <main class="site-content" :class="{ 'site-content--tabs': $route.meta.isTab }">
                <el-tabs
                    v-if="$route.meta.isTab"
                    v-model="mainTabsActiveName"
                    :closable="true"
                    @tab-click="selectedTabHandle"
                    @tab-remove="removeTabHandle"
                >
                    <el-dropdown class="site-tabs__tools" trigger="click">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                        <template #dropdown>
                            <el-dropdown-menu >
                                <el-dropdown-item @click="tabsCloseCurrentHandle">
                                    关闭当前标签页
                                </el-dropdown-item>
                                <el-dropdown-item @click="tabsCloseOtherHandle">关闭其它标签页</el-dropdown-item>
                                <el-dropdown-item @click="tabsCloseAllHandle">关闭全部标签页</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <el-tab-pane v-for="item in mainTabs" :label="item.title" :name="item.name" :key="item.title">
                        <el-card :body-style="siteContentViewHeight" shadow="never">
                            <iframe
                                v-if="item.type === 'iframe'"
                                :src="item.iframeUrl"
                                width="100%"
                                height="100%"
                                frameborder="0"
                                scrolling="yes"
                            ></iframe>
                            <router-view v-if="item.name === mainTabsActiveName" v-slot="props" >
                                 <transition leave-active-class="animate__animated animate__fadeOutDown"
                                    enter-active-class="animate__animated animate__bounceInRight" 
                                    appear
                                    mode="out-in">
                            
                                        <component :is="props.Component" />
                            
                                </transition>
                    
                            </router-view>
                        </el-card>
                    </el-tab-pane>
                </el-tabs>
                <!-- 主入口标签页 e -->
                <el-card v-else :body-style="siteContentViewHeight" shadow="never">
                    <!-- <router-view /> -->
                    <router-view v-slot="props">
                        <transition leave-active-class="animate__animated animate__bounceOutLeft"
                                    enter-active-class="animate__animated animate__bounceInRight" 
                                    appear
                                    mode="out-in">
                            
                                <component :is="props.Component" />
                            
                        </transition>
                    </router-view>
                </el-card>
            </main>
        </div>
    </div>
</template>

<script>
import SvgIcon from '../components/SvgIcon.vue';
import { isURL } from '../utils/validate';
import UpdatePassword from './changePassword/update-password.vue';
import { ref, provide, onMounted, getCurrentInstance } from 'vue';
import { ElNotification } from 'element-plus';


export default {

    setup() {
        const updatePassword = ref(null)
        const showModel = ref(null)
        const show = ref(false)
        const yiyan = ref('')
        const fullscreen = ref(false)
        const contentText = ref('点击或者按 F11 进入全屏')
        onMounted(() => {

            getCurrentInstance().appContext.config.globalProperties.$yhRequest.get('https://api.muxiaoguo.cn/api/yiyan?api_key=16d76a0353713b97').then((res) => {
                yiyan.value = res.data.content
            })
            closeModel()
        })
         // 关闭蒙版
        const closeModel = () => {
            setTimeout(() => {
            console.log(showModel)
            show.value = true
            // showModel.value.addAttribute('class', 'animate__animated animate__fadeOut')
            }, 5000)
        }
        setTimeout(() => {
            showModel.value.style.display = 'none'
            console.log(showModel.value.style)
        },5500)
        return {
            showModel,
            show,
            yiyan,
            updatePassword,
            fullscreen,
            contentText,
        }
    },
    components: { SvgIcon, UpdatePassword },
    data: function() {
        return {
            navbarLayoutType: '',
            sidebarFold: false,
            sidebarLayoutSkin: 'dark',
            name: '',
            photo: '',
            documentClientHeight: 0,
            siteContentViewHeight: {},
            height: null,
            mainTabs: [],
            mainTabsActiveName: '',
            menuActiveName: '',
            updatePasswordVisible: false
        };
    },
    created() {
        let that = this;
        that.routeHandle(that.$route);
        that.$options.sockets.onopen = function(resp) {
            //发送心跳检测，避免超时后服务端切断连接
            setInterval(function() {
                that.$socket.sendObj({ opt: 'ping' });
            }, 60 * 1000);
        };
    },
    watch: {
        $route: {
            handler(to, from) {
                if (to.path != from.path) {
                    // this.$router.push(to);
                    this.routeHandle(to);
                }
            }
        }
    },
    methods: {
        handleSwitch: function() {
            if (this.sidebarFold) {
                this.navbarLayoutType = '';
            } else {
                this.navbarLayoutType = 'fold';
            }
            this.sidebarFold = !this.sidebarFold;
        },
        resetDocumentClientHeight: function() {
            this.documentClientHeight = document.documentElement['clientHeight'];
            window.onresize = () => {
                this.documentClientHeight = document.documentElement['clientHeight'];
                this.loadSiteContentViewHeight();
            };
        },
        loadSiteContentViewHeight: function() {
            let height = this.documentClientHeight - 50 - 30 - 2;
            if (this.$route.meta.isTab) {
                height -= 40;
                this.siteContentViewHeight = isURL(this.$route.meta.iframeUrl)
                    ? { height: height + 'px' }
                    : { minHeight: height + 'px' };
                this.height = provide('height', { height: height - 40 + 'px' });
            }
            this.siteContentViewHeight = { minHeight: height + 'px' };
        },
        routeHandle: function(route) {
            //每次切换页面，重新计算页面高度和内容区高度
            this.resetDocumentClientHeight();
            this.loadSiteContentViewHeight();

            if (route.meta.isTab) {
                // tab选中, 不存在先添加
                var tab = this.mainTabs.filter(item => item.name === route.name)[0];
                if (!tab) {
                    if (route.meta.isDynamic) {
                        route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0];

                        if (!route) {
                            return console.error('未能找到可用标签页!');
                        }
                    }
                    tab = {
                        menuId: route.meta.menuId || route.name,
                        name: route.name,
                        title: route.meta.title,
                        type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
                        iframeUrl: route.meta.iframeUrl || '',
                        params: route.params,
                        query: route.query
                    };
                    this.mainTabs = this.mainTabs.concat(tab);
                }
                this.menuActiveName = tab.menuId + '';
                this.mainTabsActiveName = tab.name;
            }
        },
        logout: function() {
            let that = this;
            that.$http('user/logout', 'GET', null, true, function(resp) {
                localStorage.removeItem('permissions');
                that.$router.push({ name: 'Login' });
            });
            ElNotification({
                title: '退出登录成功！',
                message: '请您重新登录系统！',
                type: 'success',
            })
        },
        updatePasswordHandle: function() {
            // this.$router.push('/profile/changePassword')
            this.updatePassowrdVisible = true;
            
            this.$nextTick(() => {
                this.$refs.updatePassword.init();
            });
          
        },
        selectedTabHandle: function(tab, e) {
            tab = this.mainTabs.filter(item => item.name === tab.paneName);
            if (tab.length >= 1) {
                this.$router.push({
                    name: tab[0].name,
                    query: tab[0].query,
                    params: tab[0].params
                });
            }
        },
        removeTabHandle: function(tabName) {
            this.mainTabs = this.mainTabs.filter(item => item.name !== tabName);
            if (this.mainTabs.length >= 1) {
                // 当前选中tab被删除
                if (tabName === this.mainTabsActiveName) {
                    var tab = this.mainTabs[this.mainTabs.length - 1];
                    this.$router.push({ name: tab.name, query: tab.query, params: tab.params }, () => {
                        this.mainTabsActiveName = this.$route.name;
                    });
                }
            } else {
                this.menuActiveName = '';
                this.$router.push({ name: 'Home' });
            }
        },
        // tabs, 关闭当前
        tabsCloseCurrentHandle: function() {
            this.removeTabHandle(this.mainTabsActiveName);
        },
        // tabs, 关闭其它
        tabsCloseOtherHandle: function() {
            this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName);
        },
        // tabs, 关闭全部
        tabsCloseAllHandle: function() {
            this.mainTabs = [];
            this.menuActiveName = '';
            this.$router.push({ name: 'Home' });
        },
        goProfile() {
            this.$router.push('/profile')
        },
        kaishi()  {
            this.fullscreen = true
            this.contentText = '点击或按 F11 退出全屏'  
            var docElm = document.documentElement;  
            //W3C   
            if (docElm.requestFullscreen) {  
                docElm.requestFullscreen();  
            }  
                //FireFox   
            else if (docElm.mozRequestFullScreen) {  
                docElm.mozRequestFullScreen();  
            }  
                //Chrome等   
            else if (docElm.webkitRequestFullScreen) {  
                docElm.webkitRequestFullScreen();  
            }  
                //IE11   
            else if (elem.msRequestFullscreen) {  
                elem.msRequestFullscreen();  
            }
            console.log(this.fullscreen)  
        },
        guanbi() {
            this.fullscreen = false  
            this.contentText = '单击或按 F11 进入全屏' 
            if (document.exitFullscreen) {  
                document.exitFullscreen();  
            }  
            else if (document.mozCancelFullScreen) {  
                document.mozCancelFullScreen();  
            }  
            else if (document.webkitCancelFullScreen) {  
                document.webkitCancelFullScreen();  
            }  
            else if (document.msExitFullscreen) {  
                document.msExitFullscreen();  
            }  
        }
    },
    mounted: function() {
        let that = this;
        //加载用户数据
        that.$http('user/loadUserInfo', 'GET', null, true, function(resp) {
            let json = resp;
            let name = json.name;
            let photo = json.photo;
            that.name = name;
            that.photo = photo;
        });

        that.resetDocumentClientHeight();
        that.loadSiteContentViewHeight();
    }
};
</script>

<style lang="scss">
@import '../assets/scss/index.scss';
.welcome {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(163, 160, 160, 0.466);  
  z-index: 1000;
  transition:  all .5s ease;
}
.welcomeText { 
    position: absolute;
    top: 40%;
    left: 20%;
    transform: translate(-20%,-10%);
    h1 {
        font-size: 86px;
        background-image: linear-gradient(to bottom right, #1a2dda, #e47534, #32D296);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
    }
}
.el-card {
    border-radius: 20px !important;
}
.el-tabs__item {
    border: 1px solid #c1a680;
    border-radius: 20px;
    padding: 0 8px !important;
    color: #c1a680 !important;
}
.el-tabs__item.is-active {
    background-color: #c1a680;
    color: #fff !important;
}
.el-tabs__active-bar { 
    background-color: #ffd04b !important;
}
.el-table .cell {
        padding: 0 !important;
}
.rightCard .el-card__body{
    background-color: #fff !important;
    min-height: 430px;
}
.el-card__body {
    background-color: #f6f8f8 !important;
}

</style>
