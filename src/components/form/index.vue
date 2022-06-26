<template>
  <el-form
    v-if="model"
    :model="model"
    :rules="rules"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :size="size"
    v-bind="attrs"
    ref="form"
  >
    <el-form-item
      v-for="opt in options"
      :prop="opt.prop"
      :label="opt.label"
      :key="opt.prop"
      :required="opt.required"
    >
      <component
        v-model="model[opt.prop]"
        :placeholder="opt.placeholder"
        :disabled="opt.disabled"
        :show-password="opt.showPassword"
        :clearable="opt.clearable"
        :is="`el-${opt.type}`"
        v-bind="opt.attrs"
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
    <el-form-item v-bind="actionAttrs">
      <slot name="actions" :clearForm="clearForm" :submitForm="submitForm">
        <el-button
          v-if="!defaultAction || defaultAction?.clear?.show"
          @click="clearForm"
        >
          {{ defaultAction?.clear?.name || "清空" }}</el-button
        >
        <el-button
          v-if="!defaultAction || defaultAction?.submit?.show"
          @click="submitForm(null)"
          >{{ defaultAction?.submit?.name || "确定" }}</el-button
        >
      </slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
// 高级表单
// 1. 根据字段提供输入
// 2. 可以渲染多种类型的控件，例如input或者select
// 3. 提供自定义校验规则

import { FormProp } from "./types";
import { PropType, reactive, defineComponent, ref, onMounted } from "vue";
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
  FormInstance,
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

  emits: ["success", "failed"],

  setup({ formOptions }, { emit }) {
    const model = reactive(cloneDeep(formOptions.model));
    const {
      rules,
      options,
      labelWidth,
      labelPosition,
      size,
      attrs,
      defaultAction,
      actionAttrs,
    } = formOptions;

    const form = ref<FormInstance>();

    const clearForm = () => {
      form.value?.resetFields();
    };

    const submitForm = (cb: Function | null) => {
      form.value?.validate((valid) => {
        // 可以传入空，这样就会调用默认行为，否则调用回调
        cb ? cb(valid) : emit(valid ? "success" : "failed");
      });
    };

    return {
      model,
      rules,
      options,
      labelWidth,
      labelPosition,
      size,
      attrs,
      form,
      defaultAction,
      actionAttrs,
      clearForm,
      submitForm,
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
