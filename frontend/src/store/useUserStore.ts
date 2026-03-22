import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { LoginResponse } from "../schemas/auth.schemas";

interface UserState {
  user: LoginResponse["user"] | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Ações
  setAuth: (data: LoginResponse) => void;
  setLoading: (status: boolean) => void;
  setError: (message: string | null) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // --- ESTADOS INICIAIS ---
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // --- AÇÕES ---

      // Usado após o sucesso do login/registro
      setAuth: (data: LoginResponse) => {
        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      setLoading: (status: boolean) => set({ isLoading: status }),

      setError: (message: string | null) =>
        set({ error: message, isLoading: false }),

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        localStorage.removeItem("user-storage");
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useUserStore;
