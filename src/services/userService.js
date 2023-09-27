import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiUrl + "/user";

export function saveUser(user) {
  return http.post(apiEndpoint, user);
}
