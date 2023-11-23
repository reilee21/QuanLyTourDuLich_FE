import axios from "axios";
const somee = "http://huflittravel.somee.com";
const local = "https://localhost:7102";

const instance = axios.create({
  baseURL: local,
});

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;
