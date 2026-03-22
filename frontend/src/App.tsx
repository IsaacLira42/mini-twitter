import { ToastProvider } from "./components/ui/Toast";
import TimelinePage from "./pages/Timeline/TimelinePage";

function App() {
  return (
    <ToastProvider>
      <TimelinePage />
    </ToastProvider>
  );
}

export default App;
