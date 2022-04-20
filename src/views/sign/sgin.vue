<template>
  <n-space vertical :size="12">
    <n-card hoverable>
        <n-data-table
            :bordered="false"
            :columns="columns"
            :data="formDate"
            :pagination="pagination"
        />
    </n-card>
    <n-drawer v-model:show="active" :width="502">
        <n-drawer-content>
        <template #header>
            修改此时间
        </template>
        <div>
            <n-card hoverable>
                <div style="margin-bottom:20px">请选择 <em style="font-weight:bolder">{{transformTime.name}}</em> 对应的时间</div>
                <br>    
                <n-time-picker :default-formatted-value="transformTime.time" v-model:formatted-value="transformTime.time" />
                <div style="margin-top:30px;text-align:center">
                    <el-button  type="primary" @click="submit">确认更改此时间</el-button>
                </div>
            </n-card>
        </div>
        <template #footer>
            <n-button @click="active = false">关闭弹框</n-button>
        </template>
        </n-drawer-content>
    </n-drawer>
  </n-space>
</template>

<script>
import { h, defineComponent } from 'vue'
import { NTag, NButton } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { getAllSign, changeSign } from './sginHttp.js'
import { ElMessage } from 'element-plus'
const createColumns = ({ changeDate }) => {
  return [
    {
      title: '对应考勤名称',
      key: 'name',
      render(row) {
          return h(
              NTag, 
              {
                  type: 'success'
              },
              {
                  default: () => row.name
              }
          )
      }
    },
    {
      title: '时间',
      key: 'time',
      render (row) {
        const tags = [1].map(() => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'warning'
            },
            {
              default: () => row.time
            }
          )
        })
        return tags
      }
    },
    {
      title: 'Action',
      key: 'actions',
      render (row) {
        return h(
          NButton,
          {
            strong: true, 
            secondary: true,
            round: true,
            type: "info",
            size: 'small',
            onClick: () => changeDate(row)
          },
          { default: () => '修改此时间' }
        )
      }
    }
  ]
}



export default defineComponent({
  setup () {
    const formDate = ref([])
    const time = ref(null)

    onMounted(() => {
         getAllSignhttp()
    })
    const getAllSignhttp = () => {
        getAllSign().then(res => {
            formDate.value = res
        }) 
    }
    const changeDate = (row) => {
        active.value = true
        transformTime.value = JSON.parse(JSON.stringify(row))
        console.log(row)
    }
    const active = ref(false)
    const transformTime = ref(null)
    const submit = () => {
        changeSign(transformTime.value).then(res => {
           if( res.code === 200 ) {
               ElMessage({
                    message: res.message,
                    type: 'success'
                })
                getAllSignhttp()
           } else {
               ElMessage({
                    message: res.message,
                    type: 'error'
                })
           }
            active.value = false

        })
    }
    return {
        time,
        submit,
        active,
        transformTime,
        formDate, // 表格数据源
      columns: createColumns({
        changeDate
      }),
      pagination: {
        pageSize: 10
      }
    }
  }
})
</script>

<style lang="scss" scoped>
    
</style>