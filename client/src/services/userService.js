import http from "./httpService";

const apiEndpoint = `/api/user`;

export function register(user) {
  return http.post(`${apiEndpoint}/new`, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}

export function getUser(userId) {
  return http.get(`${apiEndpoint}/${userId}`);
}

export default {
  register,
  getUser
};
