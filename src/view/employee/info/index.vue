<template>
  <div>
    <advanced-table-v2
      :getTableData="getTableData"
      :getSearchData="getTableData"
      :updateTableData="updateTableData"
      :deleteTableData="deleteTableData"
      :tableOptions="tableOptions"
      :searchNameHolder="'员工姓名'"
    >
      <template #second-action>
        <el-input v-model="deptId" placeholder="部门编号"></el-input>
      </template>
    </advanced-table-v2>
  </div>
</template>

<script setup lang="ts">
import AdvancedTableV2 from "@components/table-v2/index.vue";
import { reactive, ref } from "vue";
import { TableProp } from "@components/types";
import {
  getAccountInfo,
  deleteAccount,
  updateAccount,
  AccountParams,
} from "@service/contract";

const deptId = ref(null);

const getTableData = async (parmas: AccountParams) => {
  const {
    data: { userList: dataList, pages, total },
    code,
  } = await getAccountInfo({ ...parmas, departmentId: deptId.value });
  return Promise.resolve({
    data: { dataList, pages, total },
    code,
  });
};

const updateTableData = (model: any) => {
  return updateAccount(model);
};

const deleteTableData = ({ id }: any) => {
  return deleteAccount({ id });
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
      prop: "userName",
      label: "用户名",
      editable: true,
    },
    {
      prop: "password",
      label: "密码",
    },
    {
      prop: "gender",
      label: "性别",
      editable: true,
      render: (gender: string) => (!gender ? "男" : "女"),
    },
    {
      prop: "age",
      label: "年龄",
      editable: true,
    },
    {
      prop: "phone",
      label: "手机号",
      editable: true,
    },
    {
      prop: "departmentId",
      label: "部门编号",
      editable: true,
    },
    {
      prop: "weak",
      label: "薪资",
      editable: true,
    },
    {
      prop: "contractId",
      label: "合同编号",
      editable: true,
    },
    {
      prop: "status",
      label: "账号状态",
      editable: true,
      render: (state: string) => (!state ? "正常" : "封禁"),
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
