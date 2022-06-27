<template>
  <div
    class="h-[700px] shadow-md bg-white w-[1100px] grid grid-cols-6 rounded-md overflow-hidden absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
  >
    <div class="col-span-4 p-20 text-center">
      <div class="text-3xl font-serif font-medium text-[rgb(225,216,195)]">
        <span
          @click="changeLogin('reg')"
          :class="{ 'active-btn': logState === 'reg' }"
          class="cursor-pointer"
          >注册</span
        >
        <span class="text-blue-300 px-3">/</span>
        <span
          @click="changeLogin('login')"
          :class="{
            'active-btn': logState === 'login' || logState === 'phone',
          }"
          class="cursor-pointer"
          >登陆</span
        >
      </div>
      <div class="mt-20 px-20">
        <advanced-form ref="form" :form-options="formOptions">
          <template #valid-code>
            <el-row class="w-full">
              <el-col :span="18" class="pr-3">
                <!-- 由于自定义的表单项没法在form里进行绑定，所以也没法进行
                     校验？总之这里是没法的了，改为CSS样式提示了...算了，
                     还是直接消息框提示了w
                 -->
                <el-input
                  v-model="validCode"
                  placeholder="请输入验证码"
                ></el-input>
              </el-col>
              <el-col :span="6">
                <el-button
                  class="w-full"
                  :loading="btnLoading"
                  @click="sendMessage"
                  type="primary"
                  >发送</el-button
                >
              </el-col>
            </el-row>
          </template>
          <template #actions="scoped">
            <el-button
              v-if="logState === 'login'"
              class="phone-text"
              @click="changeLogin('phone')"
              link
              >手机号登陆</el-button
            >
            <el-button
              v-if="logState === 'phone'"
              class="phone-text"
              @click="changeLogin('login')"
              link
              >账号密码登陆</el-button
            >
            <el-button
              @click="scoped.submitForm(handleSubmit)"
              class="mt-4 w-full"
              style="margin-left: 0"
              plain
              :class="logState ? 'login-btn' : 'reg-btn'"
              >{{
                logState === "login" || logState === "phone" ? "登陆" : "注册"
              }}</el-button
            >
          </template>
        </advanced-form>
      </div>
    </div>
    <div class="col-span-2 background"></div>
  </div>
</template>

<script setup lang="ts">
import { FormProp } from "../../../components/types";
import { ref, reactive, computed, inject } from "vue";
import { userLogin, sendValidCode } from "@service/login";
import { useRouter } from "vue-router";

import AdvancedForm from "@components/form/index.vue";

// true注册，false登陆
// 发现还有手机号和用户名登陆两种，所以改成三种模式了
// reg, login, phone
const logState = ref<string>("login");

const validCode = ref("");

const form = ref<any>();

const $baseMessage: any = inject("$baseMessage");

const router = useRouter();

const btnLoading = ref(false);

const changeLogin = (state: string) => {
  logState.value = state;
  form.value?.clearForm();
};

const formOptions = reactive<FormProp>({
  model: {
    phone: "",
    userName: "",
    password: "",
  },
  size: "large",
  rules: {
    userName: [
      {
        max: 6,
        min: 2,
        message: "用户名最长6位，最短2位！",
        trigger: ["blur"],
      },
    ],
    phone: [
      {
        max: 11,
        min: 11,
        message: "手机号长度只能为11位！",
        trigger: ["blur"],
      },
    ],
    password: [
      {
        min: 3,
        message: "密码最短2位！",
        trigger: ["blur"],
      },
    ],
  },
  options: [
    {
      prop: "userName",
      type: "input",
      placeholder: "用户名",
      required: true,
      hidden: computed(() => logState.value === "phone"),
    },
    {
      prop: "phone",
      type: "input",
      placeholder: "手机号",
      required: true,
      hidden: computed(() => logState.value === "login"),
    },
    {
      prop: "password",
      type: "input",
      placeholder: "密码",
      required: true,
      hidden: computed(() => logState.value === "phone"),
    },
    {
      prop: "",
      type: "slot",
      slot: "valid-code",
      hidden: computed(() => logState.value !== "phone"),
    },
  ],
});

const sendMessage = async () => {
  if (form.value.model.phone.length !== 11) {
    $baseMessage({
      message: "请输入有效的手机号！",
      type: "error",
    });

    return;
  }

  btnLoading.value = true;

  sendValidCode(form.value.model).then((res: any) => {
    if (res.code === 400) {
      $baseMessage({
        message: "验证码发送失败，请重试！",
        type: "error",
      });
      btnLoading.value = false;
    } else {
      $baseMessage({
        message: "验证码发送成功，一分钟内有效哦！",
        type: "success",
      });
      setTimeout(() => (btnLoading.value = false), 60000);
    }
  });
};

const handleSubmit = (valid: boolean, model: any) => {
  // 针对手机号情况进行特判
  if (logState.value === "phone" && !validCode.value) {
    $baseMessage({
      message: "请输入验证码！",
      type: "error",
    });
    return;
  }
  if (!valid) return;

  btnLoading.value = true;

  userLogin({ ...model, validCode: validCode.value }, logState.value).then(
    (res: any) => {
      if (logState.value === "reg" && res.code === 200) {
        $baseMessage({
          message: "注册成功！",
          type: "success",
        });
        setTimeout(() => window.location.reload(), 300);
        return;
      }
      if (logState.value === "reg" && res.code === 400) {
        $baseMessage({
          message: res.msg,
          type: "error",
        });
        return;
      }
      if (res.code === 400) {
        $baseMessage({
          message:
            logState.value === "login"
              ? "用户名或密码错误辣！"
              : "验证码错辣！",
          type: "error",
        });
        return;
      }
      if (res.code === 200) {
        $baseMessage({
          message: "登陆成功辣！",
          type: "success",
        });
        setTimeout(() => router.replace("/dashboard/home"), 300);
      }
    }
  );

  // console.log(valid, model);
};
</script>

<style scoped>
.background {
  background: url("../../../assets/images/login-illusion.jpg") no-repeat center;
}

.login-btn {
  @apply w-full bg-green-400 border-none text-white hover:bg-green-300 !important;
}

.reg-btn {
  @apply w-full border-green-400 text-green-400 hover:bg-green-300 hover:text-white !important;
}

.phone-text {
  @apply text-gray-300 hover:text-green-300 !important;
}
.active-btn {
  transition: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  transform: scale(1.2);
  display: inline-block;
  @apply text-green-400 !important;
}
</style>
