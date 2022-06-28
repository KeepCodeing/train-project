import request from ".";

interface ContractProp {
  contractName?: string;
  effectiveDate?: string;
  expirationTime?: string;
  cp?: string;
  ls?: string;
  id?: number;
}

export function getContractData(params: ContractProp) {
  return request({
    url: "/api/personnelmanagementsystem/contract/getSplitContractList?cp=1&ls=10",
    method: "GET",
    params,
  });
}

export function findContract(params: ContractProp) {
  return request({
    url: "/api/personnelmanagementsystem/contract/getContractById",
    method: "GET",
    params,
  });
}
