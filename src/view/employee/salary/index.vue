<template>
  <div>
    <advanced-table-v2
      :getTableData="getTableData"
      :updateTableData="updateTableData"
      :deleteTableData="deleteTableData"
      :tableOptions="tableOptions"
    >
    </advanced-table-v2>
  </div>
</template>

<script setup lang="ts">
import AdvancedTableV2 from "@components/table-v2/index.vue";
import { reactive, ref } from "vue";
import { TableProp } from "@components/types";
import { getSalaryInfo, deleteSalary, updateSalary } from "@service/contract";

const getTableData = async (parmas: any) => {
  const {
    data: { payList: dataList, pages, total },
    code,
  } = await getSalaryInfo({ ...parmas });
  return Promise.resolve({
    data: { dataList, pages, total },
    code,
  });
};

const updateTableData = (model: any) => {
  return updateSalary(model);
};

const deleteTableData = ({ id }: any) => {
  return deleteSalary({ id });
};

const tableOptions = reactive<TableProp>({
  data: [],
  fit: true,
  size: "large",
  border: true,
  stripe: true,
  showSearch: false,
  columnOptions: [
    {
      prop: "id",
      label: "id",
      width: 70,
    },
    {
      prop: "username",
      label: "用户名",
      width: 70,
    },
    {
      prop: "reason",
      label: "申请理由",
      editable: true,
    },
    {
      prop: "amount",
      label: "申请工资",
      editable: true,
      width: 100,
    },
    {
      prop: "status",
      label: "状态",
      width: 50,
    },
    {
      prop: "applyTime",
      label: "申请时间",
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
