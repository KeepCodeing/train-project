<template>
  <div>
    <advanced-table-v2
      :getTableData="getTableData"
      :getSearchData="getTableData"
      :updateTableData="updateTableData"
      :deleteTableData="deleteTableData"
      :tableOptions="tableOptions"
      :searchNameHolder="'总结内容'"
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
import { TableProp } from "@components/types";
import {
  getSummaryInfo,
  SummaryParams,
  deleteSummary,
  updateSummary,
} from "@service/assignment";

const getTableData = async (parmas: SummaryParams) => {
  const {
    data: { records: dataList, pages, total },
    code,
  } = await getSummaryInfo(parmas);
  return Promise.resolve({
    data: { dataList, pages, total },
    code,
  });
};

const updateTableData = (model: any) => {
  return updateSummary(model);
};
const deleteTableData = ({ id }: any) => {
  return deleteSummary({ id });
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
      prop: "username",
      label: "用户名",
      width: 100,
    },
    {
      prop: "content",
      label: "总结内容",
      showOverflowTooltip: true,
      editable: true,
    },
    {
      prop: "type",
      label: "类型",
      editable: true,
      width: 70,
    },
    {
      prop: "conclusionDate",
      label: "发布时间",
      width: 190,
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
</script>

<style scoped></style>
