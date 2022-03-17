<template>
    <div v-if="!isLoading" style="min-height:110px">

        <el-steps :active="active" finish-status="success">
            <el-step title="开始"></el-step>
            <el-step title="开题"></el-step>
            <el-step title="开发"></el-step>
            <el-step title="中期"></el-step>
            <el-step title="论文"></el-step>
            <el-step title="答辩"></el-step>
        </el-steps>
        <el-button  plain style="margin-top: 12px;width:100%" @click="showModal">下一步</el-button>
   </div>
   <div v-else style="min-height:110px;" >    
     <div class="loader">

     </div>
   </div>
    
    <el-dialog
    v-model="centerDialogVisible"
    title="提示"
    width="30%"
    destroy-on-close
    center
  >
    <span
      >是否提交</span
    >
    <div>
      <strong>您在完成该项目之前仅有一次机会进行状态修改！</strong>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">我再想想</el-button>
        <el-button type="primary" @click="confirm"
          >提交</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { ref, defineProps } from 'vue'
defineProps({
  isLoading: Boolean,
})
const active = ref(3)
const centerDialogVisible = ref(false)
const showModal = () => {
    centerDialogVisible.value = true
}
const next = () => {
  if (active.value++ > 5) active.value = 0
}
const confirm= () => {
    next()
    centerDialogVisible.value = false
    ElMessage.success('恭喜您，离毕业又进一步！')
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.loader {
 --height-of-loader: 6px;
 --loader-color: #FBCA1F;
 width: 60%;
 margin: 45px  auto;
 height: var(--height-of-loader);
 border-radius: 30px;
 background-color: rgba(0,0,0,0.2);
 position: relative;
}

.loader::before {
 content: "";
 position: absolute;
 background: var(--loader-color);
 top: 0;
 left: 0;
 width: 0%;
 height: 100%;
 border-radius: 30px;
 animation: moving 1s ease-in-out infinite;
 ;
}

@keyframes moving {
 50% {
  width: 100%;
 }

 100% {
  width: 0;
  right: 0;
  left: unset;
 }
}
</style>