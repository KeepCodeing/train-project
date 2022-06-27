<template>
  <div>
    <advanced-table :tableOptions="tableOptions"></advanced-table>
  </div>
</template>

<script setup lang="ts">
import AdvancedTable from "@components/table/index.vue";
import { TableProp } from "../../../components/types";
import { reactive, defineComponent } from "vue";
import { getContractData } from "@service/contract";

// 这里出现了异步请求，但页面空白的问题...
// 解决方案之一是用suspense包裹，另外就是用函数式async/await

const {
  data: { contractList, pages, total },
} = await getContractData();

const tableOptions = reactive<TableProp>({
  data: contractList,
  fit: true,
  size: "large",
  border: true,
  stripe: true,
  columnOptions: [
    {
      prop: "id",
      label: "id",
      width: 50,
    },
    {
      prop: "contractName",
      label: "合同名称",
      width: 200,
    },
    {
      prop: "content",
      label: "合同内容",
      showOverflowTooltip: true,
    },
    {
      prop: "effectiveDate",
      label: "合同生效时间",
      width: 200,
    },
    {
      prop: "expirationTime",
      label: "合同过期时间",
      width: 200,
    },
  ],
});
</script>

<style scoped></style>
