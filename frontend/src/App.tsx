import Index from "./pages/Auth/Index";
import { ToastProvider } from "./components/ui/Toast";

function App() {
  return (
    <ToastProvider>
      <Index />
    </ToastProvider>
  );
}

export default App;
