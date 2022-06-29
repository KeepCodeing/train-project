import "element-plus/es/components/message/style/css";
import { ElMessage, MessageParams } from "element-plus";
import { UserInfo } from "./types";

const gb = {
  $baseMessage: (
    config: MessageParams = { message: "", type: "success", duration: 3000 }
  ) => {
    return ElMessage(config);
  },

  $readUserInfo: () => {
    const userInfo = localStorage.getItem("user-info");
    return userInfo && JSON.parse(userInfo);
  },

  $writeUserInfo: (userInfo: UserInfo) => {
    localStorage.setItem("user-info", JSON.stringify(userInfo));
  },

  $clearUserInfo: () => {
    localStorage.clear();
  },

  install(app: any) {
    for (const key in this) {
      if (key === "install") continue;
      app.provide(key, gb[key as keyof typeof gb]);
    }
  },
};

export default gb;
