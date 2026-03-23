import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthIndex from "../pages/Auth/Index";
import TimelinePage from "../pages/Timeline/TimelinePage";
import useUserStore from "../store/useUserStore";

const AppRoutes = () => {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthIndex />} />

        <Route
          path="/timeline"
          element={
            isAuthenticated ? <TimelinePage /> : <Navigate to="/auth" replace />
          }
        />

        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/timeline" : "/auth"} replace />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
