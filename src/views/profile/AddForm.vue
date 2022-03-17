<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    label-placement="top"
  >
    <n-grid :cols="24" >
      <n-form-item-gi :span="20" label="请输入项目名称" path="inputValue">
        <n-input v-model:value="model.inputValue" placeholder="请输入项目名称" />
      </n-form-item-gi>
      <n-form-item-gi :span="20" label="项目截至时间" path="datetimeValue">
        <n-date-picker v-model:value="model.datetimeValue" type="datetime" placeholder="请选择项目截至时间" />
      </n-form-item-gi>
      <n-form-item-gi :span="20" label="项目占比" path="inputNumberValue">
        <n-input-number :step="5" v-model:value="model.inputNumberValue" placeholder="项目占比单位(%)" />
      </n-form-item-gi>
      <n-form-item-gi :span="20" label="项目默认未完成" path="switchValue">
        <n-switch v-model:value="model.switchValue" />
      </n-form-item-gi>
      <n-form-item-gi :span="20" label="项目目前进度" disabled path="sliderValue">
        <n-slider v-model:value="model.sliderValue" :step="5" />
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

export default defineComponent({
    emits: ['closemodal'],
  setup() {
    const formRef = ref(null);
    const emit = getCurrentInstance().emit
    const submit = () => {
        
        emit('closemodal',123)
    }
    return {
        submit,
      formRef,
      size: ref("medium"),
      model: ref({
        inputValue: null,
        datetimeValue: null,
        nestedValue: {
          path1: null,
          path2: null
        },
        switchValue: false,
        inputNumberValue: null,
        sliderValue: 0,
      }),

      rules: {
        inputValue: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入 项目名称"
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
        },
        sliderValue: {
          validator(rule, value) {
            return value > 50;
          },
          trigger: ["blur", "change"],
          message: "sliderValue 需要大于 50"
        }
      },
    };
  }
});
</script>