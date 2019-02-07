import http from "./httpService";

const apiEndpoint = `/api/beer`;

export function getAllBeer(startId, endId) {
  return http.get(`${apiEndpoint}/between/${startId}/${endId}`);
}

export function searchBeer(queryStr) {
  return http.get(`${apiEndpoint}/search/${queryStr}`);
}

export function searchBeerByCategory(catId) {
  return http.get(`${apiEndpoint}/search/category/${catId}`);
}

export function getBeer(beerId) {
  return http.get(`${apiEndpoint}/${beerId}`);
}

export default {
  getAllBeer,
  getBeer,
  searchBeer,
  searchBeerByCategory
};
