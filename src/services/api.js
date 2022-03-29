import axios from "axios";

const api = axios.create({
  baseURL: "https://crm.youcast.tv.br/test/",
  headers: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMSIsImlhdCI6MTY0ODU3NDU4NCwiZXhwIjoxNjQ4NTg1Mzg0fQ.kiZ7Y0155GmWGsTEQKT-TZVPmoNt2773I5cMmH2ETck',
  },

});

export default api;