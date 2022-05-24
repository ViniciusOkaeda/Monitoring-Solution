import axios from "axios";

const info = localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://monitoring.youcast.tv.br/",
  headers: {
    token: info
  }
});



export default api;