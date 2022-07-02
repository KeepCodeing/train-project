<template>
  <el-row :gutter="gutter" :justify="justify" :align="align">
    <!-- 同样也是没有响应式的 -->
    <el-col :span="leftSpan" v-bind="$attrs.leftAttr">
      <slot name="left"></slot>
    </el-col>
    <el-col :span="rightSpan" v-bind="$attrs.rightAttr">
      <slot name="right"></slot>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
// 这里采用插槽加props的形式实现
import { defineProps, PropType } from "vue";

type JustifyType =
  | "start"
  | "end "
  | "center"
  | "space-around"
  | "space-between"
  | "space-evenly";

type AlignType = "top" | "middle" | "bottom";

const props = defineProps({
  gutter: {
    type: Number,
    default: 0,
  },
  leftSpan: {
    type: Number,
    default: 12,
  },
  rightSpan: {
    type: Number,
    default: 12,
  },
  justify: {
    type: String,
    default: "center",
  },
  align: {
    type: String as PropType<AlignType>,
    default: "middle",
  },
});

const { gutter, leftSpan, rightSpan, justify, align } = props;
</script>

<style scoped></style>
