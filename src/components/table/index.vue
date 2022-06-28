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
  <!-- 这里不采用双向绑定的方式进行操作，想了想current-change才是核心 
       用双向绑定可能要监听page的改变，这样就稍微有点麻烦了...
       于是发现这种写法已经被弃用了，那么还是改成v-model了w
  -->
  <el-pagination
    v-if="paginationOption?.show"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :small="paginationOption?.small"
    :disabled="paginationOption?.disabled"
    :background="paginationOption?.background"
    :layout="
      paginationOption?.layout || 'total, sizes, prev, pager, next, jumper'
    "
    :total="paginationOption?.total"
    @size-change="$emit('size-change')"
    @current-change="$emit('current-change')"
  />
</template>

<script setup lang="ts">
import { TableProp } from "./types";
import { defineProps, PropType } from "vue";
import { ElPagination } from "element-plus";

const props = defineProps({
  tableOptions: {
    type: Object as PropType<TableProp>,
    required: true,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 1,
  },
});

const { tableOptions } = props;

const { columnOptions, paginationOption } = tableOptions;
</script>

<style scoped></style>
