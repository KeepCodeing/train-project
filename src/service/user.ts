import request from ".";

export function getUserInfo(id: number) {
  return request({
    url: "/api/personnelmanagementsystem/sysuser/getSysUserById",
    method: "GET",
    params: {
      id,
    },
  });
}
