<template>
  <el-table
    :data="tableOptions.data"
    :height="tableOptions.height"
    :max-height="tableOptions.maxHeight"
    :stripe="tableOptions.stripe"
    :border="tableOptions.border"
    :size="tableOptions.size"
    :fit="tableOptions.fit"
    :emptyText="tableOptions.emptyText"
  >
    <template v-for="opt in columnOptions" :key="opt.prop">
      <el-table-column
        :prop="opt.prop"
        :label="opt.label"
        :type="opt.type"
        :width="opt.width"
        :fixed="opt.fixed"
        :resizeable="opt.resizeable"
        :show-overflow-tooltip="opt.showOverflowTooltip"
        :align="opt.align"
        :header-align="opt.headerAlign"
        v-if="!opt.hidden"
      >
        <template v-if="opt.slot" #default="scoped">
          <slot :name="opt.slot" :scoped="scoped"></slot>
        </template>
        <!-- 未完成：editable功能 -->
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { TableProp } from "./types";
import { defineProps, PropType } from "vue";

const props = defineProps({
  tableOptions: {
    type: Object as PropType<TableProp>,
    required: true,
  },
});

const { tableOptions } = props;

const { columnOptions } = tableOptions;
</script>

<style scoped></style>
