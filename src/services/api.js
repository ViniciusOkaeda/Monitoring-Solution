import axios from "axios";
import { getToken } from "./auth";


const api = axios.create({
  baseURL: "https://crm.youcast.tv.br/test/",
  headers: {
    token: localStorage.getItem("token")
  }
});



export default api;