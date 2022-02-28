<template>
    
        <el-steps :active="active" finish-status="success">
            <el-step title="开始"></el-step>
            <el-step title="开题"></el-step>
            <el-step title="开发"></el-step>
            <el-step title="中期"></el-step>
            <el-step title="论文"></el-step>
            <el-step title="答辩"></el-step>
        </el-steps>
        <el-button style="margin-top: 12px" @click="showModal">下一步</el-button>
    
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
import { ref } from 'vue'

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
</style>