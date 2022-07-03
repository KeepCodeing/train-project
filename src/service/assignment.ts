import request from ".";

export interface AssignMentParams {
  cp?: number;
  ls?: number;
  startDate?: string;
  endDate?: string;
  searchName?: string;
  id?: number;
}

export function getAssignmentInfo(params: AssignMentParams) {
  const parmasMap = {
    searchName: "name",
    startDate: "startTime",
    endDate: "endTime",
    cp: "cp",
    ls: "ls",
  };
  return request({
    url: "/api/personnelmanagementsystem/task/getSplitTaskList",
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

export function addAssignment(model: AssignMentParams) {
  return request({
    url: "/api/personnelmanagementsystem/task/addTask",
    method: "POST",
    data: model,
  });
}

export function deleteAssignment({ id }: AssignMentParams) {
  return request({
    url: "/api/personnelmanagementsystem/task/deleteTaskById",
    method: "POST",
    data: { id },
  });
}

export function updateAssignment(model: AssignMentParams) {
  return request({
    url: "/api/personnelmanagementsystem/task/updateTask",
    method: "POST",
    data: model,
  });
}
