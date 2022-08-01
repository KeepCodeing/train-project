import axios, { AxiosResponse } from "axios";
import gb from "../global/utils";

const $baseMessage: any = gb.$baseMessage;

const errorMessage = {
  401: "您没有权限访问当前页面！",
  404: "请确定资源是否存在！",
  403: "请求出错辣，请检查代码是否存在问题！",
  405: "请求方式出错辣，请检查代码！",
  500: "服务器出错辣，请刷新后再试！",
  503: "服务器出错辣，请刷新后再试！",
};

const instance = axios.create({
  // 不知道是vite的问题还是axios的问题，这里如果写了baseURL会导致
  // 无法路径重写，也就没法通过代理服务器跨域请求...
  // 记得在cli里是不会这样的？
  // baseURL: "http://huiyuanai.cloud:8091",
  baseURL:
    import.meta.env.ENV === "development"
      ? import.meta.env.VITE_PRO_BASE_URL
      : import.meta.env.VITE_DEV_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const handleData = (resp: AxiosResponse) => {
  if (!resp) {
    $baseMessage({
      type: "error",
      message: "请求出错辣，请检查请求是否被正确响应！",
    });
    return;
  }

  if (errorMessage[resp.status as keyof typeof errorMessage]) {
    $baseMessage({
      type: "error",
      message: errorMessage[resp.status as keyof typeof errorMessage],
    });
  }

  // 去掉一层data
  if (resp.data) return resp.data;
  return resp;
};

instance.interceptors.request.use(
  (req) => {
    // 基本没什么配置，不需要带上token，也不需要对表单什么的特殊处理
    return req;
  },
  (error) => {
    // request是根本没发出请求才会有error，例如没网
    $baseMessage({
      type: "error",
      message: "请求出错辣，请检查网络连接是否正常！",
    });
    // console.log(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    // 处理下错误码
    return handleData(res);
  },
  (error) => {
    // error有两种情况，第一种是请求发出去了，服务器报错，这时是有响应体的
    // 另一种就是请求没发出去，例如CORS，这种情况是没有响应体的
    const { response } = error;

    handleData(response);
  }
);

export default instance;
