import axios from "axios";

const api = axios.create({
  baseURL: "http://10.10.150.136:3000/",
  headers: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMSIsImlhdCI6MTY0Nzk3MzQyNSwiZXhwIjoxNjQ3OTg0MjI1fQ.dPK595mKvro4xdrYRedj6w2ivXVg-Z_fsWe5jzk65oo',
  },

});

export default api;