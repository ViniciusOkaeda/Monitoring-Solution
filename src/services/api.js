import axios from "axios";

const api = axios.create({
  baseURL: "https://crm.youcast.tv.br/test/",
  headers: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMSIsImlhdCI6MTY0ODc1MjcwMywiZXhwIjoxNjQ4NzYzNTAzfQ.tEBC_peL1g1e9zLq1FNhuhjr9yLE_bIYyyIw-v6qPnU',
  },

});

export default api;