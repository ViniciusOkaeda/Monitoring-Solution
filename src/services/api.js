import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "https://crm.youcast.tv.br/test/",
  headers: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMSIsImlhdCI6MTY0ODg0MjIwMiwiZXhwIjoxNjQ4ODUzMDAyfQ.Begwfhhe2ly1WwrnzSKryTT34mgVMfHTkCId9uKJApI'
  }
});

api.interceptors.request.use(async config => {
  const tokenH = getToken();
  if (tokenH) {
    config.headers.common = {
      'token': tokenH
    };
  }
  return config;
});


export default api;