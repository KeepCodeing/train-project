// 利用类似vben-admin的方法对全局用户信息再进行一次封装
import { UserInfo } from "../global/types";
import gb from "../global/utils";

const isObjectEmpty = (obj: any) => {
  if (obj && typeof obj === "object") return Object.keys(obj).length > 0;
  return false;
};

const useUserInfo = () => ({
  getUserInfo() {
    return gb.$readUserInfo();
  },

  setUserInfo(userInfo: UserInfo) {
    gb.$writeUserInfo(userInfo);
  },

  checkUserInfo() {
    return isObjectEmpty(this.getUserInfo());
  },
});

export { useUserInfo };
