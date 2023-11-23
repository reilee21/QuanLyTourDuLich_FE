import axios from "axios";
const somee = "https://huflittravel.somee.com";
const local = "https://localhost:7102";

const instance = axios.create({
  baseURL: somee,
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
