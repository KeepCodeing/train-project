<template>
  <el-form
    v-if="model"
    :model="model"
    :rules="rules"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :size="size"
  >
    <el-form-item
      v-for="opt in options"
      :prop="opt.prop"
      :label="opt.label"
      :key="opt.prop"
    >
      <component
        v-model="model[opt.prop]"
        :placeholder="opt.placeholder"
        :disabled="opt.disabled"
        :show-password="opt.showPassword"
        :is="`el-${opt.type}`"
      >
        <template v-if="opt.children?.length">
          <component
            v-for="child in opt.children"
            :key="child.prop"
            :placeholder="opt.placeholder"
            :disabled="opt.disabled"
            :show-password="opt.showPassword"
            :label="opt.label"
            :is="`el-${opt.type}`"
          ></component>
        </template>
      </component>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
// 高级表单
// 1. 根据字段提供输入
// 2. 可以渲染多种类型的控件，例如input或者select
// 3. 提供自定义校验规则

import { FormProp } from "./types";
import { PropType, reactive, defineComponent } from "vue";
import { cloneDeep } from "lodash";
// 自动导入无法和动态组件一起正常使用，于是得手动导入
// 而且setup语法糖支持有问题，改为普通方式才行
import {
  ElInput,
  ElSelect,
  ElOption,
  ElCheckboxGroup,
  ElCheckbox,
  ElSwitch,
  ElRadioGroup,
  ElRadio,
} from "element-plus";

export default defineComponent({
  components: {
    "el-input": ElInput,
    "el-select": ElSelect,
    "el-option": ElOption,
    "el-checkbox-group": ElCheckboxGroup,
    "el-checkbox": ElCheckbox,
    "el-switch": ElSwitch,
    "el-radio-group": ElRadioGroup,
    "el-radio": ElRadio,
  },
  props: {
    formOptions: {
      type: Object as PropType<FormProp>,
      required: true,
    },
  },

  setup({ formOptions }) {
    const model = reactive(cloneDeep(formOptions.model));
    const { rules, options, labelWidth, labelPosition, size } = formOptions;

    return {
      model,
      rules,
      options,
      labelWidth,
      labelPosition,
      size,
    };
  },
});

// const components = defineComponent({
//   "el-input": ElInput,
//   "el-select": ElSelect,
//   "el-option": ElOption,
//   "el-checkbox-group": ElCheckboxGroup,
//   "el-checkbox": ElCheckbox,
//   "el-switch": ElSwitch,
//   "el-radio-group": ElRadioGroup,
//   "el-radio": ElRadio,
// });

// const props = defineProps({
//   formOptions: {
//     type: Object as PropType<FormProp>,
//     required: true,
//   },
// });

// console.log(upperFirst(camelCase(`el-${"input"}`)));

// const model = reactive(cloneDeep(props.formOptions.model));
// const { rules, options, labelWidth, labelPosition, size } = props.formOptions;
</script>

<style scoped></style>
