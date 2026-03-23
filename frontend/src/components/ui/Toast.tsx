import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ToastType = "info" | "success" | "error";
type Toast = { id: string; message: string; type?: ToastType };

type ToastContextValue = {
  push: (toast: { message: string; type?: ToastType }) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: { message: string; type?: ToastType }) => {
    const id = String(Date.now()) + Math.random().toString(16).slice(2);
    setToasts((s) => [...s, { id, message: t.message, type: t.type }]);
  }, []);

  useEffect(() => {
    if (!toasts.length) return;

    const timers = toasts.map((t) =>
      setTimeout(() => {
        setToasts((s) => s.filter((x) => x.id !== t.id));
      }, 4000),
    );

    return () => timers.forEach((t) => clearTimeout(t));
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}

      {/* Container bottom-right */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`max-w-sm w-full px-4 py-3 rounded shadow-lg text-sm text-white wrap-break-word ${
              t.type === "success"
                ? "bg-green-600"
                : t.type === "info"
                  ? "bg-blue-600"
                  : "bg-red-600"
            }`}
            role="status"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export default ToastProvider;
