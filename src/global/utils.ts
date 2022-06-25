import "element-plus/es/components/message/style/css";
import { ElMessage, MessageParams } from "element-plus";

const gb = {
  $baseMessage: (
    config: MessageParams = { message: "", type: "success", duration: 3000 }
  ) => {
    return ElMessage(config);
  },

  install(app: any) {
    for (const key in this) {
      if (key === "install") continue;
      app.provide(key, gb[key as keyof typeof gb]);
    }
  },
};

export default gb;
