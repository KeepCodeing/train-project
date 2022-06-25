import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_PRO_BASE_URL
    : import.meta.env.VITE_DEV_BASE_URL,
});

instance.interceptors.request.use((req) => {
  return req;
});

instance.interceptors.response.use((res) => {
  return res;
});

export default instance;
