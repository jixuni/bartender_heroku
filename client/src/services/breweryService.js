import http from "./httpService";

const apiEndpoint = `/api/brewery`;

export function getBrewery(breweryId) {
  return http.get(`${apiEndpoint}/${breweryId}`);
}

export default {
  getBrewery
};
