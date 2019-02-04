import http from "./httpService";

const apiEndpoint = `/api/beer`;

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
