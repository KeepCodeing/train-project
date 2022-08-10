<template>
  <el-menu
    active-text-color="#ffd04b"
    :default-active="$route.path"
    text-color="#fff"
    class="menu"
    background-color="#545c64"
  >
    <template v-for="item in routes" :key="item.path">
      <!-- 发现项目里根本没有可以展示得一级路由... -->
      <el-menu-item
        v-if="!item.meta?.hidden && !item.children?.length && checkRoles(item)"
        >{{ item.meta!.title }}</el-menu-item
      >
      <el-sub-menu
        :index="item.path"
        v-else-if="item.meta && !item.meta.hidden && item.children?.length"
      >
        <template #title>
          <!-- 自动引入加上动态组件果不其然又出问题了...改为全局
               引入图标加动态组件
           -->
          <!-- <component :is="`i-ep-${item.meta!.icon}`"></component> -->
          <el-icon>
            <component :is="capitalize(item.meta?.icon as string)"></component>
          </el-icon>
          <span>{{ item.meta?.title }}</span>
        </template>
        <template v-for="subitem in item.children">
          <el-menu-item
            :index="`${item.path}/${subitem.path}`"
            v-if="!subitem.meta?.hidden && checkRoles(subitem)"
            :route="subitem"
            @click="$router.push(`${item.path}/${subitem.path}`)"
          >
            <el-icon>
              <component
                :is="capitalize(subitem.meta?.icon as string)"
              ></component>
            </el-icon>
            {{ subitem.meta?.title }}
          </el-menu-item>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
// 考虑到项目路由比较简单，所以这里直接写个
// 两层循环渲染就完事了
import { routes } from "../../../router/index";
import { capitalize } from "lodash";
import { RouteRecordRaw } from "vue-router";
import { useUserInfo } from "../../../hooks/useUserInfo";

const checkRoles = (item: RouteRecordRaw) => {
  const userRole = useUserInfo().getUserInfo().status;
  if (!item.meta?.roles) return true;
  return Array.isArray(item.meta.roles) && item.meta.roles.includes(userRole);
};
</script>

<style scoped>
.menu {
  background: var(--menu-bg-color);
}
</style>
