<template>
  <el-container style="height: 100%">
    <el-header class="header">Header</el-header>
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
import Menu from "../components/menu.vue";
</script>

<style scoped>
.menu {
  background: var(--menu-bg-color);
}
.header {
  background: var(--header-bg-color);
}
</style>
