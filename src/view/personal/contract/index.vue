<template>
  <div class="text-3xl text-center">个人合同</div>
  <el-table :data="tableData" border style="width: 60%; margin: 20px auto">
    <el-table-column prop="key" label="属性" width="250" align="center" />
    <el-table-column prop="value" label="内容" align="center" />
  </el-table>
</template>

<script setup lang="ts">
import { findContract } from "../../../service/contract";
const userContractById = await findContract({ id: 3 }).then((res) => {
  return res.data;
});

const tableData = [
  {
    key: "id",
    value: userContractById.id,
  },
  {
    key: "合同名称",
    value: userContractById.contractName,
  },
  {
    key: "合同内容",
    value: userContractById.content,
  },
  {
    key: "合同生效时间",
    value: userContractById.effectiveDate,
  },
  {
    key: "合同过期时间",
    value: userContractById.expirationTime,
  },
];
</script>

<style scoped></style>
