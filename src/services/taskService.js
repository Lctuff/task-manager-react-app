import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiUrl + "/tasks";

export function getTasks() {
  return http.get(apiEndpoint);
}
export function getTask(taskId) {
  return http.get(apiEndpoint + "/" + taskId);
}

export function saveTask(task) {
  if (task._id) {
    const body = { ...task };

    delete body._id;

    return http.put(apiEndpoint + "/" + task._id, body);
  }

  return http.post(apiEndpoint, task);
}

export function deleteTask(taskId) {
  return http.delete(apiEndpoint + "/" + taskId);
}
