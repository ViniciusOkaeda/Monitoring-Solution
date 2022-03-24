import axios from "axios";

const api = axios.create({
  baseURL: "http://10.10.150.136:3000/",
  headers: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMSIsImlhdCI6MTY0ODE0MDcyNiwiZXhwIjoxNjQ4MTUxNTI2fQ.gJHti77eKQ7ExDtcDz0o49Z_mPnjRtAhbsXYC8fmXlE',
  },

});

export default api;