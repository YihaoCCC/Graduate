<template>
<n-scrollbar>
	<router-view  v-if="isShow"/>
</n-scrollbar>
</template>

<script>
export default {
	name: 'App',
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
