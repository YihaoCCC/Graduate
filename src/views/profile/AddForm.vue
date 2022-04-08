<template>
  <n-form
    ref="formRef"
    :model="model"
    label-placement="top"
  >
    <n-grid :cols="24" >
      <n-form-item-gi :span="20" label="请输入项目名称" path="inputValue">
        <n-input v-model:value="model.name" placeholder="请输入项目名称" />
      </n-form-item-gi>
      <n-form-item-gi :span="20" label="项目开始时间" path="datetimeValue">
        <n-date-picker v-model:formatted-value="model.beginDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择项目开始时间" />
      </n-form-item-gi>
      <n-form-item-gi :span="20" label="项目截至时间" path="datetimeValue">
        <n-date-picker v-model:formatted-value="model.endDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择项目截至时间" />
      </n-form-item-gi>
      <n-form-item-gi :span="20" label="项目内容简介" path="inputNumberValue">
       <n-input
          v-model:value="model.content"
          type="textarea"
          placeholder="项目内容简介"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="20" label="项目默认未完成" path="switchValue">
        <n-switch v-model:value="model.switchValue" disable />
      </n-form-item-gi>
      <n-form-item-gi :span="20" label="项目目前进度" disabled >
        <n-slider v-model:value="model.jindu" :step="1" :max='6' />
      </n-form-item-gi>
    </n-grid>
    <n-grid :col='24'>
        <n-form-item-gi :span="20" >
            <n-button type='primary' @click="submit">新增该项目</n-button>
      </n-form-item-gi>
    </n-grid>
  </n-form>

</template>

<script>
import { defineComponent, ref,getCurrentInstance} from "vue";
import  yhRequest  from '../../utils/yhRequest'
export default defineComponent({
    emits: ['closemodal'],
  setup() {
    const formRef = ref(null);
    const emit = getCurrentInstance().emit
    const model= ref({
          userId: localStorage.getItem('USERID'),
          name: null,
          jindu: 0,
          beginDate: null,
          endDate: null,
          content: null,
      })
    const submit = () => {
        yhRequest.post('/api/project/add', model.value).then((res) => {
          if(res.code === 200) {
            emit('closemodal',res.code)
            
          }
        })
    }
    return {
        submit,
        formRef,
        size: ref("medium"),
        model,

      rules: {
        inputValue: {
          required: true,
          trigger: [ "input"],
          message: "请输入项目名称"
        },
        datetimeValue: {
          type: "number",
          required: true,
          trigger: ["blur", "change"],
          message: "请输入 datetimeValue"
        },
        inputNumberValue: {
          type: "number",
          required: true,
          trigger: ["blur", "change"],
          message: "请输入 inputNumberValue"
        }
      },
    };
  }
});
</script>