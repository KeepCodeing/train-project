<template>
  <advanced-form :form-options="formOptions"></advanced-form>
</template>

<script setup lang="ts">
import AdvancedForm from "@components/form/index.vue";
import { FormProp } from "../../components/types";

// 这里传入的数据不强制要求是reactive，因为实际上
// 这里用不着，只是做个model的填充而已
const userInfo = {
  phone: "",
  validCode: "",
};

const formOptions: FormProp = {
  model: userInfo,
  options: [
    {
      prop: "phone",
      type: "input",
    },
    {
      prop: "validCode",
      type: "input",
    },
  ],
};
</script>

<style scoped></style>
