<template>
  <advanced-table :tableOptions="tableOptions"></advanced-table>
</template>

<script setup lang="ts">
import AdvancedTable from "@components/table/index.vue";
import { TableProp } from "../../../components/types";
import { reactive } from "vue";
import { getContractData } from "@service/contract";

const data = await getContractData();

const tableOptions = reactive<TableProp>({
  data,
  columnOptions: [
    {
      prop: "id",
      label: "id",
    },
  ],
});
</script>

<style scoped></style>
