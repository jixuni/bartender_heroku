import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = `${apiUrl}/api/category`;

export function getAllCategory() {
  return http.get(`${apiEndpoint}/all`);
}
