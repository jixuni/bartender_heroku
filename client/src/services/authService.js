import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = `/login`;
const tokenKey = "token";
const ageKey = "over21";

// this gets rid of bidirectional dependencies
http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  // store the jwt obtained and store it in localStorage
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  try {
    return localStorage.getItem(tokenKey);
  } catch (ex) {
    console.log("jwt exception");
    return "";
  }
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

export function over21() {
  localStorage.setItem(ageKey, "over21");
}

export function verifyAge() {
  return localStorage.getItem(ageKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
  over21,
  verifyAge
};
