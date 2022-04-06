import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "https://crm.youcast.tv.br/test/",
  headers: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMSIsImlhdCI6MTY0OTI2NDAxMywiZXhwIjoxNjQ5Mjc0ODEzfQ.i5GzDoymkjjr0vG4i7mFO334iK6XCkanhG-s1e4VO2Q'
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