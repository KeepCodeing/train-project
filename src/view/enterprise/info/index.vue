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
      :addBtnText="'增加信息'"
    />
  </div>
</template>

<script setup lang="ts">
import AdvancedTableV2 from "@components/table-v2/index.vue";
import { reactive } from "vue";
import { TableProp, FormProp } from "@components/types";
import {
  getInfo,
  InfoParams,
  addInfo,
  deleteInfo,
  updateInfo,
} from "@service/enterprise";

const getTableData = async (parmas: InfoParams) => {
  const {
    data: { records: dataList, pages, total },
    code,
  } = await getInfo(parmas);
  return Promise.resolve({
    data: { dataList, pages, total },
    code,
  });
};

const updateTableData = (model: any) => {
  return updateInfo(model);
};
const deleteTableData = ({ id }: any) => {
  return deleteInfo({ id });
};
const addTableData = (model: any) => {
  return addInfo(model);
};

const tableOptions = reactive<TableProp>({
  data: [],
  fit: true,
  size: "large",
  border: true,
  stripe: true,
  showSearch: true,

  columnOptions: [
    {
      prop: "id",
      label: "id",
      width: 70,
    },
    {
      prop: "name",
      label: "公司名称",
      editable: true,
      width: 160,
    },
    {
      prop: "latestAnnouncement",
      label: "最近公告",
      editable: true,
    },
    {
      prop: "figureImg",
      label: "图片地址",
      editable: true,
      width: 160,
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
      placeholder: "请输入公司名称",
      label: "公司名称",
      required: true,
    },
    {
      prop: "latestAnnouncement",
      type: "input",
      placeholder: "请输入最近公告",
      label: "最近公告",
      required: true,
    },
    {
      prop: "figureImg",
      type: "input",
      placeholder: "请输入图片地址",
      label: "图片地址",
      required: true,
    },
  ],
});
</script>

<style scoped></style>
