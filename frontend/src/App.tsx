import { ToastProvider } from "./components/ui/Toast";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  );
}

export default App;
