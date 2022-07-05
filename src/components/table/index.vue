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
    v-loading="loading"
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
        <template #default="{ $index, row, column }">
          <slot
            v-if="opt.slot"
            :name="opt.slot"
            v-bind="{ $index, row, column }"
          >
            <!-- 如果slot为action，那么提供一个默认操作选项 -->
            <template v-if="opt.slot === 'action'">
              <el-button
                type="primary"
                @click="handleRowEditClick($index, row, column)"
                >{{ $index === currentEditRow ? "保存" : "编辑" }}</el-button
              >
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="InfoFilled"
                icon-color="#626AEF"
                title="确定要删除这条数据吗？"
                @confirm="() => handleRowDelete($index, row, column)"
              >
                <template #reference>
                  <el-button type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </slot>
          <template
            v-else-if="
              currentEditCell === $index + column['property'] ||
              (opt.editable && $index === currentEditRow)
            "
          >
            <component
              v-bind="opt.editAttrs"
              :is="opt.editType ? `el-${opt.editType}` : 'el-input'"
              style="width: 80%"
              v-model="row[column['property']]"
            ></component>
            <el-icon
              @click="handleCellCheck($index, row, column)"
              class="ml-1 cursor-pointer"
            >
              <check v-show="!(opt.editable && $index === currentEditRow)" />
            </el-icon>
          </template>
          <template v-else-if="opt.editable">
            <span
              >{{ opt.render ? opt.render(row[opt.prop!]) : row[opt.prop!] }}</span
            >
            <el-icon
              @click="handleCellClick($index, row, column)"
              class="ml-1 cursor-pointer"
            >
              <edit />
            </el-icon>
          </template>
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
    v-model:current-page="tp"
    v-model:page-size="ps"
    :small="paginationOption?.small"
    :disabled="paginationOption?.disabled"
    :background="paginationOption?.background"
    :layout="
      paginationOption?.layout || 'total, sizes, prev, pager, next, jumper'
    "
    :total="paginationOption?.total"
    class="mt-5"
  />
</template>

<script setup lang="ts">
import { TableProp } from "./types";
import { defineProps, PropType, computed, defineEmits, ref } from "vue";
import { ElPagination } from "element-plus";

import {
  ElInput,
  ElSelect,
  ElOption,
  ElCheckboxGroup,
  ElCheckbox,
  ElSwitch,
  ElRadioGroup,
  ElRadio,
  ElDatePicker,
  FormInstance,
} from "element-plus";

// 初版table，不支持内部维护分页状态、不支持增删改查等接口的实现

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
    default: 10,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

// 其实也可以用attr...，只不过之前在这里解构写死了所以有种不能灵活命名的错觉
// const { onUpdateContract: updateContract }: any = useAttrs();

const emit = defineEmits([
  "update:current-page",
  "update:page-size",
  "updateCellData", // 改为attrs直接传入
  "updateRowData",
  "deleteRowData",
]);

const tp = computed({
  get: () => props.currentPage,
  set: (val) => emit("update:current-page", val),
});

const ps = computed({
  get: () => props.pageSize,
  set: (val) => emit("update:page-size", val),
});

const { tableOptions } = props;

const { columnOptions, paginationOption } = tableOptions;

const editableColumn = computed(() =>
  columnOptions.reduce((prev: any, now: any) => {
    if (now.editable) prev.push(now.prop!);
    return prev;
  }, [])
);

// 处理可编辑行的思路：给每一行加个editable对象，里面放的就是
// 当前行的键

// 但这样做效率低下，而且会占用很多空间...实际上从功能上出发，我们是
// 点击icon触发编辑，而不是点击单元格触发编辑，这样就能规避掉单元格
// 点击拿不到index，只能拿到row和column的问题
// 拿到index和column就能确定唯一的当前单元格，通过这个就能指定渲染
// input或者其它功能了

const currentEditRow = ref(-1);
const currentEditCell = ref("");

const handleCellClick = ($index: any, row: any, column: any) => {
  currentEditCell.value = $index + column["property"];
};

const handleCellCheck = ($index: any, row: any, column: any) => {
  currentEditCell.value = "";
  // 还是改为了emit形式，原因是attr无法统一方法名
  emit("updateCellData", row, column, $index);
  // updateContract($index, row, column);
};

const handleRowEditClick = ($index: any, row: any, column: any) => {
  currentEditCell.value = "";
  if (currentEditRow.value === $index) {
    const editRow = editableColumn.value.reduce((prev: any, now: any) => {
      prev[now] = row[now];
      return prev;
    }, {});
    emit("updateRowData", editRow, row, column, $index);
    currentEditRow.value = -1;
    return;
  }
  currentEditRow.value = $index;
};

const handleRowDelete = ($index: any, row: any, column: any) => {
  emit("deleteRowData", row, column, $index);
};
</script>

<style scoped></style>
