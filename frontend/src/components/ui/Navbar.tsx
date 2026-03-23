import { Search, LogOut } from "lucide-react";
import useUserStore from "../../store/useUserStore";
import { authService } from "../../api/auth.service";
import { useToast } from "./Toast";
import { useNavigate } from "react-router-dom";
import { Buttons } from "./Buttons";

export const Navbar = () => {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const { push } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      // ignore backend errors but proceed to clear local state
    }
    // clear local store
    useUserStore.getState().logout();
    push({ message: "Desconectado com sucesso", type: "success" });
    navigate("/auth");
  };

  return (
    <nav className="w-full bg-white dark:bg-slate-900 h-16 border-b border-gray-100 dark:border-slate-800 px-6 flex items-center justify-between shadow-[0_4px_10px_rgba(0,0,0,0.05)] sticky top-0 z-50">
      {/* Logo / Título */}
      <div className="shrink-0">
        <h1 className="text-[#0095FF] font-bold text-xl tracking-tight">
          Mini Twitter
        </h1>
      </div>

      {/* Barra de Busca Central */}
      <div className="flex-1 max-w-2xl px-8">
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search
              size={18}
              className="text-slate-400 group-focus-within:text-[#0095FF] transition-colors"
            />
          </div>
          <input
            type="text"
            placeholder="Buscar por post..."
            className="w-full bg-transparent border border-gray-200 dark:border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm text-text-body-timeline-light dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0095FF] focus:ring-1 focus:ring-[#0095FF] transition-all"
          />
        </div>
      </div>

      {/* Ações / Login/Register ou Logout */}
      <div className="shrink-0 flex items-center gap-3">
        {!isAuthenticated ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/auth")}
              className="w-39 h-10 font-bold rounded-full border border-card-light text-text-body-light bg-transparent hover:bg-slate-50 transition-colors flex items-center justify-center"
            >
              Registrar-se
            </button>
            <Buttons
              className="w-39 h-10 font-bold flex items-center justify-center shadow-[0_4px_12px_rgba(0,149,255,0.3)]"
              onClick={() => navigate("/auth")}
              type="button"
            >
              Login
            </Buttons>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0095FF] text-white shadow-[0_4px_12px_rgba(0,149,255,0.3)] hover:bg-[#0084E6] transition-all active:scale-90"
            title="Sair"
          >
            <LogOut size={20} />
          </button>
        )}
      </div>
    </nav>
  );
};
