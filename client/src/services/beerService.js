import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = `${apiUrl}/api/beer`;

export function getAllBeer() {
  return http.get(`${apiEndpoint}/all`);
}

export function getBeer(beerId) {
  return http.get(`${apiEndpoint}/${beerId}`);
}

export default {
  getAllBeer,
  getBeer
};
