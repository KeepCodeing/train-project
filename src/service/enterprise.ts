import request from ".";

export interface AnnouncementParams {
  cp?: number;
  ls?: number;
  startDate?: string;
  endDate?: string;
  searchName?: string;
  id?: number;
}

export function getAnnouncementInfo(params: AnnouncementParams) {
  const parmasMap = {
    searchName: "content",
    startDate: "beginTime",
    endDate: "endTime",
    cp: "cp",
    ls: "ls",
  };
  return request({
    url: "/personnelmanagementsystem/announcement/queryAnnouncement",
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

export function addAnnouncement(model: AnnouncementParams) {
  return request({
    headers: {
      "Content-Type": "application/json",
    },
    url: "/personnelmanagementsystem/announcement/addAnnouncement",
    method: "POST",
    data: model,
  });
}

export function deleteAnnouncement({ id }: AnnouncementParams) {
  return request({
    url: `/personnelmanagementsystem/announcement/delAnnouncementById/${id}`,
    method: "GET",
  });
}

export function updateAnnouncement(model: AnnouncementParams) {
  return request({
    headers: {
      "Content-Type": "application/json",
    },
    url: "/personnelmanagementsystem/announcement/updateAnnouncement",
    method: "POST",
    data: model,
  });
}

export interface DeptParams {
  cp?: number;
  ls?: number;
  id?: number;
}

export function getDeptInfo(params: DeptParams) {
  const parmasMap = {
    cp: "cp",
    ls: "lp",
  };
  return request({
    url: "/personnelmanagementsystem/department/queryDepartment",
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

export function addDept(model: DeptParams) {
  return request({
    headers: {
      "Content-Type": "application/json",
    },
    url: "/personnelmanagementsystem/department/addDepartment",
    method: "POST",
    data: model,
  });
}

export function deleteDept({ id }: DeptParams) {
  return request({
    url: `/personnelmanagementsystem/department/delDepartment/${id}`,
    method: "GET",
  });
}

export function updateDept(model: DeptParams) {
  return request({
    headers: {
      "Content-Type": "application/json",
    },
    url: "/personnelmanagementsystem/department/updateDepartment",
    method: "POST",
    data: model,
  });
}

export interface InfoParams {
  cp?: number;
  ls?: number;
  searchName?: string;
}

export function getInfo(params: InfoParams) {
  const parmasMap = {
    cp: "cp",
    ls: "lp",
    searchName: "id",
  };
  return request({
    url: "/personnelmanagementsystem/enterprise/queryEnterprise",
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

export function addInfo(model: InfoParams) {
  return request({
    headers: {
      "Content-Type": "application/json",
    },
    url: "/personnelmanagementsystem/enterprise/addEnterprise",
    method: "POST",
    data: model,
  });
}

export function deleteInfo({ id }: InfoParams) {
  return request({
    url: `/personnelmanagementsystem/enterprise/delEnterprise/${id}`,
    method: "GET",
  });
}

export function updateInfo(model: InfoParams) {
  return request({
    headers: {
      "Content-Type": "application/json",
    },
    url: "/personnelmanagementsystem/enterprise/updateEnterprise",
    method: "POST",
    data: model,
  });
}
