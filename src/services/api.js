import axios from "axios";
import { getToken } from "./auth";

const info = localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://crm.youcast.tv.br/test/",
  headers: {
    token: info
  }
});



export default api;