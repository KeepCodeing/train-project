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
    url: "/api/personnelmanagementsystem/announcement/queryAnnouncement",
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
    url: "/api/personnelmanagementsystem/announcement/addAnnouncement",
    method: "POST",
    data: model,
  });
}

export function deleteAnnouncement({ id }: AnnouncementParams) {
  return request({
    url: `/api/personnelmanagementsystem/announcement/delAnnouncementById/${id}`,
    method: "GET",
  });
}

export function updateAnnouncement(model: AnnouncementParams) {
  return request({
    headers: {
      "Content-Type": "application/json",
    },
    url: "/api/personnelmanagementsystem/announcement/updateAnnouncement",
    method: "POST",
    data: model,
  });
}
