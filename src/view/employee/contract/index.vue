<template>
  <div>
    <advanced-table
      v-model:current-page="currentPage"
      v-model:page-size="state.pageSize"
      :loading="loading"
      :tableOptions="tableOptions"
      @updateCellData="updateContract"
      @updateRowData="updateRowContract"
    ></advanced-table>
  </div>
</template>

<script setup lang="ts">
import AdvancedTable from "@components/table/index.vue";
import { TableProp } from "../../../components/types";
import { reactive, ref, onMounted, watch, toRefs } from "vue";
import {
  getContractData,
  updateContract as updateContractAPI,
  ContractBodyProp,
} from "@service/contract";

// 这里出现了异步请求，但页面空白的问题...
// 解决方案之一是用suspense包裹，另外就是用函数式async/await

const loading = ref(false);

const state = reactive({
  contractList: [],
  pages: 0,
  total: 0,

  currentPage: 1,
  pageSize: 10,
});

const { currentPage, pageSize } = toRefs(state);

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
      prop: "contractName",
      label: "合同名称",
      editable: true,
    },
    {
      prop: "content",
      label: "合同内容",
      showOverflowTooltip: true,
      editable: true,
      width: 800,
    },
    {
      prop: "effectiveDate",
      label: "合同生效时间",
    },
    {
      prop: "expirationTime",
      label: "合同过期时间",
    },
    {
      slot: "action",
      label: "操作",
      width: 200,
    },
  ],
  paginationOption: {
    show: true,
    total: 100,
  },
});

const loadTableData = async (params = { cp: 1, ls: 10 }) => {
  loading.value = true;
  const {
    data: { contractList, pages, total },
  } = await getContractData(params);

  state.contractList = contractList;
  // 总页数
  state.pages = pages;
  // 总条数
  state.total = total;

  tableOptions.data = state.contractList;
  tableOptions.paginationOption!.total! = state.total;

  loading.value = false;
};

const updateContract = (row: ContractBodyProp, column: any, $index: number) => {
  updateContractAPI({
    id: row.id,
    [column["property"]]: row[column["property"]],
  });
};

const updateRowContract = (editRow: ContractBodyProp, row: any) => {
  updateContractAPI({
    id: row.id,
    ...editRow,
  });
};

watch([currentPage, pageSize], (val) => {
  loadTableData({
    cp: val[0],
    ls: val[1],
  });
});

onMounted(() => {
  loadTableData();
});
</script>

<style scoped></style>
