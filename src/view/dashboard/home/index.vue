<template>
  <!-- 轮播图 -->
  <el-carousel :interval="3000" type="card" height="280px">
    <el-carousel-item>
      <img
        src="../../../assets/images/carousel-image/carousel-one.jpg"
        class="h-full w-full"
      />
    </el-carousel-item>
    <el-carousel-item>
      <img
        src="../../../assets/images/carousel-image/carousel-two.jpg"
        class="h-full w-full"
      />
    </el-carousel-item>
  </el-carousel>

  <!-- 子菜单跳转 -->
  <el-row :gutter="15" class="cursor-pointer">
    <el-col :span="8" v-for="item in menuData" :key="item.menuId">
      <el-card
        shadow="hover"
        class="menuCard"
        @click="$router.push({ name: item.routerName })"
      >
        <div class="menuName">
          {{ item.menuName }}
        </div>
        <div>{{ item.description }}</div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { findContract } from "@service/contract";
import { getUserInfo } from "@service/user";

const contractData = await findContract({ id: 1 });
const userInfo = await getUserInfo(1);
console.log(contractData);
console.log(userInfo);

const menuData = [
  {
    menuId: 1,
    menuName: "公司首页",
    routerName: "home",
    description: "展示企业基本信息、图片、最新公告资讯",
  },
  {
    menuId: 2,
    menuName: "我的留言",
    routerName: "message",
    description: "添加及查看个人留言及相关留言，记得按时回复哦",
  },
  {
    menuId: 3,
    menuName: "员工信息管理",
    routerName: "emp_info",
    description: "查看所有员工列表，以及员工详细信息，修改员工信息等",
  },
  {
    menuId: 4,
    menuName: "员工合同管理",
    routerName: "contract",
    description: "查看所有员工签署的合同，以及合同详细内容",
  },
  {
    menuId: 5,
    menuName: "任务列表",
    routerName: "assignment_info",
    description: "查看任务分配列表",
  },
  {
    menuId: 6,
    menuName: "工作总结",
    routerName: "summary",
    description: "查看个人工作总结",
  },
  {
    menuId: 7,
    menuName: "企业信息管理",
    routerName: "info",
    description: "查看所有企业详细信息，并进行管理",
  },
  {
    menuId: 8,
    menuName: "企业部门管理",
    routerName: "department",
    description: "查看企业对应的部门信息，并进行管理",
  },
];
</script>

<style scoped>
.menuCard {
  margin: 10px 0;
}
.menuName {
  text-align: center;
  font-size: 20px;
  padding-bottom: 10px;
}
</style>

<script setup lang="ts"></script>

<style scoped></style>
