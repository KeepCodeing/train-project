import request from ".";

interface ContractParamsProp {
  contractName?: string;
  effectiveDate?: string;
  expirationTime?: string;
  contractDate?: string;
  content?: string;
  cp?: string;
  ls?: string;
  id?: number;
}

interface ContractBodyProp {
  id: number;
  contractName?: string;
  content?: string;
  effectiveDate?: string;
  expirationTime?: string;
}

export function getContractData(params: ContractParamsProp) {
  return request({
    url: "/api/personnelmanagementsystem/contract/getSplitContractList",
    method: "GET",
    params,
  });
}

export function findContract(params: ContractParamsProp) {
  return request({
    url: "/api/personnelmanagementsystem/contract/getContractById",
    method: "GET",
    params,
  });
}

export function updateContract(data: ContractBodyProp) {
  return request({
    url: "/api/personnelmanagementsystem/contract/updateContract",
    method: "POST",
    data,
  });
}

export function deleteContract(data: ContractBodyProp) {
  return request({
    url: `/api/personnelmanagementsystem/contract/deleteContractById/${data.id}`,
    method: "POST",
  });
}

export function addContract(data: ContractBodyProp) {
  return request({
    url: "/api/personnelmanagementsystem/contract/addContract",
    method: "POST",
    data,
  });
}

export function searchContract(parmas: ContractParamsProp) {
  // 发现contractDate是一个date1,date2形式的字符串，而页面逻辑里
  // 为了追求简洁似乎不太好处理，干脆就在请求里处理了
  // 发现实际上是一个{0: date1, 1: date2}形式的对象...
  const queryStr = Object.keys(parmas)
    .filter((item: string) => Boolean(parmas[item as keyof typeof parmas]))
    .reduce((prev, now, idx) => {
      return (
        prev +
        `${idx !== 0 ? "&" : ""}${now}=${parmas[now as keyof typeof parmas]}`
      );
    }, "");
  // console.log(queryStr);
  return request({
    url: `/api/personnelmanagementsystem/contract/getSplitContractList?${queryStr}`,
    method: "GET",
  });
}

export interface AccountParams {
  cp?: number;
  ls?: number;
  searchName?: string;
  id?: number;
}

export function getAccountInfo(params: AccountParams) {
  const parmasMap = {
    searchName: "userName",
    departmentId: "departmentId",
    cp: "cp",
    ls: "ls",
  };
  return request({
    url: "/api/personnelmanagementsystem/sysuser/getSplitSysUserList",
    method: "GET",
    params: Object.keys(params)
      .filter((item) => Boolean(params[item as keyof typeof params]))
      .reduce((prev: any, now) => {
        prev[parmasMap[now as keyof typeof parmasMap]] =
          params[now as keyof typeof params];
        return prev;
      }, {}),
  });
}

export function deleteAccount({ id }: AccountParams) {
  return request({
    url: `/api/personnelmanagementsystem/sysuser/deleteById`,
    method: "POST",
    data: { id },
  });
}

export function updateAccount(model: AccountParams) {
  return request({
    url: "/api/personnelmanagementsystem/sysuser/updateUser",
    method: "POST",
    data: model,
  });
}
