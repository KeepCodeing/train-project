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

export function sendValidCode({ phone }: LoginProp) {
  console.log(phone);

  return request({
    url: "/api/personnelmanagementsystem/sysuser/sendVerificationCodeByPhone",
    method: "GET",
    params: {
      phone,
    },
  });
}

export function phoneLogin({ phone, validCode }: LoginProp) {
  // 手机号登陆
  return request({
    url: "/api/personnelmanagementsystem/sysuser/userLoginByPhoneAndVerificationCode",
    method: "POST",
    data: {
      phone,
      code: validCode,
    },
  });
}

export function userLogin(model: LoginProp, type: string) {
  if (type === "login") return accountLogin(model);
  if (type === "reg") return userRegister(model);
  if (type === "phone") return phoneLogin(model);
}
