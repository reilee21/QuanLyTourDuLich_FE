import axios from "axios";

const somee = "https://huflittravel.somee.com";

const instance = axios.create({
  baseURL: somee,
  headers: {
    "Access-Control-Allow-Origin": "https://huflittravel.vercel.app",
  },
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
