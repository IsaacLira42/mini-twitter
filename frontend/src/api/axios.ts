import axios from "axios";
import useUserStore from "../store/useUserStore";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  try {
    const token = useUserStore.getState().token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // se algo falhar ao acessar o store, não bloqueia a requisição
  }

  return config;
});

export default api;
