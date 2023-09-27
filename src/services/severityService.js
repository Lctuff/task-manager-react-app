import http from "./httpService";
import config from "../config.json";

export function getSeveritys() {
  return http.get(config.apiUrl + "/severitys");
}
