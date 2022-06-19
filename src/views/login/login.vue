<template>
<div class="login-content">
        <div class="right">
            <img src="../../assets/login/bg1.svg" alt="">
        </div>
        <div class="left">
            <div class="floatSquare">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </div>
            <div class="login-form">
                    <div class="title-container">
                                <h2>小奕在线办公服务系统</h2>
                                <span>( © Yihao Chen )</span>
                            </div>
                            <div v-if="!qrCodeVisible">
                                <div class="row">
                                    <el-input
                                        v-model="username"
                                        placeholder="用户名"
                                        prefix-icon="el-icon-user"
                                        clearable
                                    ></el-input>
                                </div>
                                <div class="row">
                                    <el-input
                                        type="password"
                                        v-model="password"
                                        placeholder="密码"
                                        prefix-icon="el-icon-lock"
                                        clearable
                                    ></el-input>
                                </div>
                                <div class="row">
                                    <el-button type="primary" class="btn" @click="login">登陆系统</el-button>
                                </div>
                                <div class="row"><a class="link" @click="changeMode">二维码登陆</a></div>
                            </div>
                            <div v-if="qrCodeVisible">
                                <div class="qrCode-container">
                                    <img :src="qrCode" height="153" class="qrCode" />
                                    <img src="../../assets/login/phone.png" height="148" />
                                </div>
                                <div class="row"><a class="link" @click="changeMode">用户名密码登陆</a></div>
                            </div>
                        </div>
        </div>
    </div>
</template>

<script>
import 'element-plus/lib/theme-chalk/display.css';
import { isUsername, isPassword } from '../../utils/validate.js';
import router from '../../router/index';
import {ElNotification } from 'element-plus'

import yhRequest from '../../utils/yhRequest'
export default {
    data: function() {
        return {
            username: null,
            password: null,
            qrCodeVisible: false,
            downloadButton: false,
            qrCode: '',
            uuid: null,
            qrCodeTimer: null,
            loginTimer: null
        };
    },

    methods: {
        login() {
            let that = this;
            if (!isUsername(that.username)) {
                that.$message({
                    message: '用户名格式不正确',
                    type: 'error',
                    duration: 1200
                });
            } else if (!isPassword(that.password)) {
                that.$message({
                    message: '密码格式不正确',
                    type: 'error',
                    duration: 1200
                });
            } else {
                let data = { username: that.username, password: that.password };
                //发送登陆请求
                yhRequest.get(`/api/user/login/${that.username}&${that.password}`).then((res) => {
                    console.log(res);
                    localStorage.setItem('USERID', res?.obj.id)
                    localStorage.setItem('USERNAME', res?.obj.name)
                    localStorage.setItem('DEPT', res.obj?.dept.deptName)
                })
                that.$http('user/login', 'POST', data, true, function(resp) {
                    if (resp.result) {
                        //在浏览器的storage中存储用户权限列表，这样其他页面也可使用storage中的数据，实现共享
                        let permissions = resp.permissions;
                        //取出Token令牌，保存到storage中
                        let token = resp.token;
                        localStorage.setItem('permissions', permissions);
                        localStorage.setItem('token', token);
                        //让路由跳转页面，这里的Home是home.vue页面的名字
                        router.push({ name: 'Home' });
                        ElNotification({
                            title: '登录成功！',
                            message: '欢迎您使用办公系统！',
                            type: 'success',
                        })
                    } else {
                        that.$message({
                            message: '登陆失败',
                            type: 'error',
                            duration: 1200
                        });
                    }
                });
            }
        },
        changeMode() {
            let that = this;
            that.qrCodeVisible = !that.qrCodeVisible;
            //加载二维码图片
            if (that.qrCodeVisible) {
                that.loadQRCode();
                //创建刷新二维码定时器
                that.qrCodeTimer = setInterval(function() {
                    that.loadQRCode();
                }, 5 * 60 * 1000);
                that.loginTimer = setInterval(function() {
                    that.$http('user/wechatLogin', 'POST', { uuid: that.uuid }, true, function(resp) {
                        if (resp.result) {
                            clearInterval(that.qrCodeTimer);
                            clearInterval(that.loginTimer);
                            let permissions = resp.permissions;
                            localStorage.setItem('permissions', permissions);
                            router.push({ name: 'Home' });
                        }
                    });
                }, 5000);
            } else {
                //销毁刷新二维码定时器
                clearInterval(that.qrCodeTimer);
                clearInterval(that.loginTimer);
            }
        },
        //加载二维码图片的封装方法
        loadQRCode() {
            this.$http('user/createQrCode', 'GET', null, true, resp => {
                this.qrCode = resp.pic;
                this.uuid = resp.uuid;
            });
        }
    }
};
</script>

<style lang="less" scoped="scoped">
@import url('login.less');
</style>
