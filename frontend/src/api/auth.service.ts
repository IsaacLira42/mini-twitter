import type { LoginFormData, RegisterFormData } from "../schemas/auth.schemas";
import api from "./axios";

export const authService = {
  register(data: RegisterFormData) {
    return api.post("/auth/register", data);
  },

  login(data: LoginFormData) {
    return api.post("/auth/login", data);
  },

  logout() {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
    return api.post("/auth/logout", { token });
  },
};
