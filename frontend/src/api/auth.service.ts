import api from "./axios"

export const authService = {
    register(data: any) {
        return api.post("/auth/register", data) 
    },

    login(data: any) {
        return api.post("/auth/login", data)
    },

    logout() {
        const token = localStorage.getItem("token");
        localStorage.removeItem("token");
        return api.post("/auth/logout", { token })
    }
}