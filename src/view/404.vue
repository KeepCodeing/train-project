<template>
  <div class="relative w-full h-full">
    <div
      class="absolute text-2xl text-red-300 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    >
      <p class="text-center">错啦，页面不存在嘛...</p>
      <p class="text-center">
        <el-button type="primary" class="mt-10" @click="$router.back()"
          >返回</el-button
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
