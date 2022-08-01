import request from ".";

export function getUserInfo(id: number) {
  return request({
    url: "/personnelmanagementsystem/sysuser/getSysUserById",
    method: "GET",
    params: {
      id,
    },
  });
}
