import request from ".";

interface ContractProp {
  contractName?: string;
  effectiveDate?: string;
  expirationTime?: string;
  cp?: string;
  ls?: string;
}

export function getContractData(params: ContractProp) {
  return request({
    url: "http://huiyuanai.cloud:8091/api/personnelmanagementsystem/contract/getSplitContractList?cp=1&ls=10",
    method: "GET",
    params,
  });
}
