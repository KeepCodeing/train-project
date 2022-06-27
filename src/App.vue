<script setup lang="ts">
import Layout from "./components/layout/index.vue";
</script>

<template>
  <suspense>
    <router-view></router-view>
  </suspense>
</template>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
}
</style>
