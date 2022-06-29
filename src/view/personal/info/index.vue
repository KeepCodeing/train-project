<template>
  <div class="text-3xl text-center">个人信息</div>
  <el-table :data="tableData" border style="width: 60%; margin: 20px auto">
    <el-table-column prop="key" label="属性" width="250" align="center" />
    <el-table-column prop="value" label="内容" align="center" />
  </el-table>
</template>

<script setup lang="ts">
import { getUserInfo } from "../../../service/user";
const userListById = await getUserInfo(3).then((res) => {
  return res.data;
});
console.log(userListById);
const tableData = [
  {
    key: "id",
    value: userListById.id,
  },
  {
    key: "姓名",
    value: userListById.userName,
  },
  {
    key: "性别",
    value: userListById.gender == 0 ? "男" : "女",
  },
  {
    key: "年龄",
    value: userListById.age,
  },
  {
    key: "电话",
    value: userListById.phone,
  },
  {
    key: "部门编号",
    value: userListById.departmentId,
  },
  {
    key: "合同编号",
    value: userListById.contractId,
  },
  {
    key: "工资",
    value: userListById.weak,
  },
  {
    key: "状态",
    value: userListById.status == 0 ? "正常" : "封禁",
  },
];
</script>

<style scoped></style>
