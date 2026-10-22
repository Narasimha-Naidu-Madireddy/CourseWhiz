import axios from "axios";

const api = axios.create({
  baseURL: "https://coursewhiz-2ow8.onrender.com/api",
});

export default api;