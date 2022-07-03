<template>
  <div>
    <advanced-table-v2
      :getTableData="getTableData"
      :getSearchData="getTableData"
      :updateTableData="updateTableData"
      :deleteTableData="deleteTableData"
      :addTableData="addTableData"
      :tableOptions="tableOptions"
      :formOptions="formOptions"
      :addBtnText="'增加任务'"
      :searchNameHolder="'任务名称'"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * getTableData 获取表格数据，对应接口里的分页查询
 * getSearchData 获取查询数据，没有特殊需求不需要改，直接用上面的就行
 * updateTableData 更新表格数据，包括单个和多个字段更新，对应更新接口
 * deleteTableData 删除表格数据，对应删除删除接口
 * addTableData 增加表格数据，对应新增数据接口
 */
import AdvancedTableV2 from "@components/table-v2/index.vue";
import { reactive } from "vue";
import { TableProp, FormProp } from "@components/types";
import {
  getAssignmentInfo,
  AssignMentParams,
  addAssignment,
  deleteAssignment,
  updateAssignment,
} from "@service/assignment";

const getTableData = async (parmas: AssignMentParams) => {
  const {
    data: { taskList: dataList, pages, total },
    code,
  } = await getAssignmentInfo(parmas);
  return Promise.resolve({
    data: { dataList, pages, total },
    code,
  });
};

// 搜索和普通加载是一样的，这里直接写成普通加载了..
// 区别在于参数个数，搜索需要判断是否非空
// const getSearchData = () => {};
const updateTableData = (model: any) => {
  return updateAssignment(model);
};
const deleteTableData = ({ id }: any) => {
  return deleteAssignment({ id });
};
const addTableData = (model: any) => {
  return addAssignment(model);
};

const tableOptions = reactive<TableProp>({
  data: [],
  fit: true,
  size: "large",
  border: true,
  stripe: true,
  columnOptions: [
    {
      prop: "id",
      label: "id",
      width: 70,
    },
    {
      prop: "name",
      label: "任务名称",
      showOverflowTooltip: true,
      editable: true,
    },
    {
      prop: "startTime",
      label: "开始时间",
      editable: true,
      editType: "date-picker",
      editAttrs: {
        format: "YYYY/MM/DD hh:mm:ss",
        "value-format": "YYYY/MM/DD hh:mm:ss",
        type: "datetime",
      },
    },
    {
      prop: "endTime",
      label: "结束时间",
      editable: true,
      editType: "date-picker",
      editAttrs: {
        format: "YYYY/MM/DD hh:mm:ss",
        "value-format": "YYYY/MM/DD hh:mm:ss",
        type: "datetime",
      },
    },
    {
      slot: "action",
      label: "操作",
      width: 200,
    },
  ],
  paginationOption: {
    show: true,
    total: 0,
  },
});

const formOptions = reactive<FormProp>({
  model: {
    name: "",
    startTime: "",
    endTime: "",
  },
  labelWidth: "80px",
  size: "large",
  options: [
    {
      prop: "name",
      type: "input",
      placeholder: "任务名称",
      label: "任务名称",
      required: true,
    },
    {
      prop: "startTime",
      type: "date-picker",
      placeholder: "开始时间",
      label: "开始时间",
      required: true,
      attrs: {
        format: "YYYY/MM/DD",
        "value-format": "YYYY/MM/DD",
      },
    },
    {
      prop: "endTime",
      type: "date-picker",
      placeholder: "结束时间",
      label: "结束时间",
      required: true,
      attrs: {
        format: "YYYY/MM/DD",
        "value-format": "YYYY/MM/DD",
      },
    },
  ],
});
</script>

<style scoped></style>
