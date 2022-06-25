<template>
  <el-menu
    active-text-color="#ffd04b"
    default-active="1"
    text-color="#fff"
    class="menu"
    background-color="#545c64"
  >
  </el-menu>
</template>

<script setup lang="ts">
// 考虑到项目路由比较简单，所以这里直接写个
// 两层循环渲染就完事了
import { routes } from "../../../router/index";
console.log(routes);
</script>

<style scoped>
.menu {
  background: var(--menu-bg-color);
}
</style>
