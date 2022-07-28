<template>
  <div>
    <advanced-table-v2
      :getTableData="getTableData"
      :updateTableData="updateTableData"
      :deleteTableData="deleteTableData"
      :addTableData="addTableData"
      :tableOptions="tableOptions"
      :formOptions="formOptions"
      :addBtnText="'增加部门'"
    />
  </div>
</template>

<script setup lang="ts">
import AdvancedTableV2 from "@components/table-v2/index.vue";
import { reactive } from "vue";
import { TableProp, FormProp } from "@components/types";
import {
  getDeptInfo,
  DeptParams,
  addDept,
  deleteDept,
  updateDept,
} from "@service/enterprise";

const getTableData = async (parmas: DeptParams) => {
  const {
    data: { records: dataList, pages, total },
    code,
  } = await getDeptInfo(parmas);
  return Promise.resolve({
    data: { dataList, pages, total },
    code,
  });
};

const updateTableData = (model: any) => {
  return updateDept(model);
};
const deleteTableData = ({ id }: any) => {
  return deleteDept({ id });
};
const addTableData = (model: any) => {
  return addDept(model);
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
      prop: "name",
      label: "部门名",
      editable: true,
    },
    {
      prop: "personCount",
      label: "部门人数",
      editable: true,
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
    content: "",
  },
  labelWidth: "80px",
  size: "large",
  options: [
    {
      prop: "name",
      type: "input",
      placeholder: "请输入部门名",
      label: "部门名",
      required: true,
    },
    {
      prop: "personCount",
      type: "input",
      placeholder: "请输入部门人数",
      label: "部门人数",
      required: true,
    },
  ],
});
</script>

<style scoped></style>
