import request from ".";

interface ContractParamsProp {
  contractName?: string;
  effectiveDate?: string;
  expirationTime?: string;
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
