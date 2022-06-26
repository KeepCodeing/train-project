import request from ".";

interface LoginProp {
  userName?: string;
  password?: string;
  phone?: string;
  validCode?: string;
}

export function accountLogin({ userName, password }: LoginProp) {
  return request({
    url: "/api/personnelmanagementsystem/sysuser/userLoginByUserNameAndPwd",
    method: "POST",
    data: {
      userName,
      password,
    },
  });
}

export function userRegister({ userName, password, phone }: LoginProp) {
  return request({
    url: "/api/personnelmanagementsystem/sysuser/registerUser",
    method: "POST",
    data: {
      userName,
      password,
      phone,
    },
  });
}

export function phoneLogin({ phone, validCode }: LoginProp) {
  // 手机号登陆
}

export function userLogin(model: LoginProp, type: string) {
  if (type === "login") accountLogin(model);
  if (type === "reg") userRegister(model);
  if (type === "phone") phoneLogin(model);
}
