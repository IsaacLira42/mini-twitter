// api/auth.service.ts
import type {
  LoginFormData,
  RegisterFormData,
  LoginResponse,
  RegisterResponse,
} from "../schemas/auth.schemas";
import api from "./axios";
import useUserStore from "../store/useUserStore";

export const authService = {
  // ? As informações de retorno serão mesmo usadas?
  async register(data: RegisterFormData): Promise<RegisterResponse> {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  async login(data: LoginFormData): Promise<LoginResponse> {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  logout() {
    const token = useUserStore.getState().token;
    // limpar estado local do usuário
    useUserStore.getState().logout();
    return api.post("/auth/logout", { token });
  },
};
