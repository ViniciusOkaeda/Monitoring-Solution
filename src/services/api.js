import axios from "axios";

const info = localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://monitoringv2.youcast.tv.br/",

});



export default api;