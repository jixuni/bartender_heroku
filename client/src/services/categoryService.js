import http from "./httpService";

const apiEndpoint = `/api/category`;

export function getAllCategory() {
  return http.get(`${apiEndpoint}/all`);
}
