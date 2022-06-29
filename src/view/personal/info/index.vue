<template>
  <div class="text-3xl text-center">个人信息</div>
  <el-table
    empty-text="暂无"
    :data="tableData"
    border
    style="width: 60%; margin: 20px auto"
  >
    <el-table-column prop="key" label="属性" width="250" align="center" />
    <el-table-column prop="value" label="内容" align="center" />
  </el-table>
</template>

<script setup lang="ts">
import { getUserInfo } from "../../../service/user";
import { inject, reactive } from "vue";
import { useRouter } from "vue-router";
import { UserInfo } from "../../../global/types";

const $readUserInfo: any = inject("$readUserInfo");
const $baseMessage: any = inject("$baseMessage");
const userInfo: UserInfo = $readUserInfo();
const router = useRouter();

const tableData = reactive<any>([]);

if (!userInfo.id) {
  $baseMessage({
    message: "没登录还想看？爬",
    type: "error",
  });
  setTimeout(() => router.replace("/login"), 500);
} else {
  const { data: userListById }: any = await getUserInfo(userInfo.id);
  tableData.push(
    ...[
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
    ]
  );
}
</script>

<style scoped></style>
