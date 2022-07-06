<template>
	<div class="welcome"  id="indexframe" ref="showModel" :class="show ? 'animate__animated animate__fadeOut' : ''">
        <!-- <div class="animate__animated animate__backInDown welcomeText animate__slow">
            <h1>
                欢迎来到小奕在线办公服务系统 (mater内容更改、git-commit-plugin使用方式)    
            </h1>
        </div> -->
		<yh-welcome welcomeText='欢迎来到小奕在线办公服务系统'></yh-welcome>
    </div>
	<n-scrollbar>
		<router-view  v-if="isShow"/>  
	</n-scrollbar>
</template>

<script>
import { ref, onMounted } from 'vue'
import YhWelcome from '../src/components/YhWelcome.vue'
export default {
	name: 'App',
	components:{
		YhWelcome
	},
	setup() {
		const show = ref(false)
		const showModel = ref(null)
		onMounted(() => {
			closeModel()
		})
		 // 关闭蒙版
        const closeModel = () => {
            setTimeout(() => {
            show.value = true
            // showModel.value.addAttribute('class', 'animate__animated animate__fadeOut')
            }, 5000)
        }
        setTimeout(() => {
            showModel.value.style.display = 'none'
        },5500)
		return {
			show,
			showModel
		}
	},
	data() {
		return {
			isShow: true
		}
	},
	provide() {
		return {
			reload: this.reload
		}
	},
	methods: {
		reload() {
			this.isShow = false
			this.$nextTick(() => {
				this.isShow = true
			})
		}
	}
};
</script>
<style lang="scss" scoped>
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
	// .welcomeText { 
	// 	position: absolute;
	// 	top: 40%;
	// 	left: 20%;
	// 	transform: translate(-20%,-10%);
	// 	h1 {
	// 		font-size: 72px;
	// 		letter-spacing: 10px;
	// 		background-image: linear-gradient(to bottom right, #fff, rgb(170, 162, 162), rgb(228, 225, 225));
	// 		-webkit-background-clip:text;
	// 		-webkit-text-fill-color:transparent;
	// 	}
	// }
</style>