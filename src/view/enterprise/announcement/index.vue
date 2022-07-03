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
      :addBtnText="'增加公告'"
      :searchNameHolder="'任务内容'"
    />
  </div>
</template>

<script setup lang="ts">
import AdvancedTableV2 from "@components/table-v2/index.vue";
import { reactive } from "vue";
import { TableProp, FormProp } from "@components/types";
import {
  getAnnouncementInfo,
  AnnouncementParams,
  addAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
} from "@service/enterprise";

const getTableData = async (parmas: AnnouncementParams) => {
  const {
    data: { announcementList: dataList, pages, total },
    code,
  } = await getAnnouncementInfo(parmas);
  return Promise.resolve({
    data: { dataList, pages, total },
    code,
  });
};

const updateTableData = (model: any) => {
  return updateAnnouncement(model);
};
const deleteTableData = ({ id }: any) => {
  return deleteAnnouncement({ id });
};
const addTableData = (model: any) => {
  return addAnnouncement(model);
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
      prop: "content",
      label: "公告内容",
      showOverflowTooltip: true,
      editable: true,
    },
    {
      prop: "releaseTime",
      label: "发布时间",
      width: 200,
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
      prop: "content",
      type: "input",
      placeholder: "公告内容",
      label: "公告内容",
      required: true,
    },
  ],
});
</script>

<style scoped></style>
