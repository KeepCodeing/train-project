<template>
  <el-form
    v-if="model"
    :model="model"
    :rules="rules"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :size="size"
    :validate-on-rule-change="false"
    hide-required-asterisk
    v-bind="attrs"
    ref="form"
  >
    <template v-for="opt in options" :key="opt.prop">
      <el-form-item
        v-if="!opt.hidden && opt.type !== 'slot'"
        :prop="opt.prop"
        :label="opt.label"
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
      <!-- 插槽项交给父组件自己处理 -->
      <el-form-item v-else-if="!opt.hidden">
        <slot :name="opt.slot" :model="model"></slot>
      </el-form-item>
    </template>

    <el-form-item v-bind="actionAttrs">
      <slot name="actions" :clearForm="clearForm" :submitForm="submitForm">
        <el-button
          v-if="!defaultAction || defaultAction?.clear?.show"
          @click="clearForm(null)"
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
import { PropType, reactive, defineComponent, ref } from "vue";
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

    // watch(
    //   options,
    //   () => {
    //     console.log(formOptions.options);
    //   },
    //   {
    //     deep: true,
    //   }
    // );

    const clearForm = (cb: Function | null) => {
      if (!cb) return form.value?.resetFields();
      cb(form.value?.resetFields);
    };

    const submitForm = (cb: Function | null) => {
      form.value?.validate((valid) => {
        // 可以传入空，这样就会调用默认行为，否则调用回调
        cb ? cb(valid, model) : emit(valid ? "success" : "failed");
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
  // 发现作用域插槽的形式只能在插槽里拿到action，然而有些
  // 操作（例如登陆的切换）是需要全局的，所以还是提供expose的
  // 形式
  expose: ["clearForm", "submitForm"],
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
