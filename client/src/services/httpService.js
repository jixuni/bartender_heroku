import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
  success => {
    console.log("REQUEST SUCCESSFUL");
    return Promise.resolve(success);
  },
  error => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    // do the following only for unexpected errors
    if (!expectedError) {
      logger.log(error);
      toast.error("Unexpected error occured");
    }

    return Promise.reject(error);
  }
);

function setJwt(jwt) {
  // if theres a token, all axios requests will include the token in the 'x-auth-token' header
  // const jwt = auth.getJwt();
  // if (jwt)
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
