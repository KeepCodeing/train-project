<template>
  <el-container style="height: 100%">
    <el-header height="50px" class="header">
      <!-- heard -->
      <!-- 下拉菜单 -->
      <el-dropdown class="right-dropdown">
        <span>
          欢迎登录:{{ userInfo.userName || "未登录" }}
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push('/personal/info')"
              >个人信息</el-dropdown-item
            >
            <el-dropdown-item>个人合同</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @click="logout" divided
              >退出系统</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="220px" class="menu">
        <Menu />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Menu from "./components/menu.vue";
import { inject } from "vue";
import { useRouter } from "vue-router";
const $readUserInfo: any = inject("$readUserInfo");
const $clearUserInfo: any = inject("$clearUserInfo");
const $baseMessage: any = inject("$baseMessage");
const userInfo = $readUserInfo();
const router = useRouter();

const logout = () => {
  $clearUserInfo();
  $baseMessage({
    message: "退出成功辣!",
    type: "success",
  });
  setTimeout(() => router.replace("/login"), 500);
};
</script>

<style scoped>
.menu {
  background: var(--menu-bg-color);
}
.header {
  background: var(--header-bg-color);
  position: relative;
}
.right-dropdown {
  position: absolute;
  right: 80px;
  color: white;
  font-weight: bold;
  line-height: 50px;
}
</style>
