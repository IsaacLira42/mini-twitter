import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthIndex from "../pages/Auth/Index";
import TimelinePage from "../pages/Timeline/TimelinePage";
import useUserStore from "../store/useUserStore";

const AppRoutes = () => {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth page: if already authenticated redirect to timeline */}
        <Route
          path="/auth"
          element={
            isAuthenticated ? (
              <Navigate to="/timeline" replace />
            ) : (
              <AuthIndex />
            )
          }
        />

        {/* Timeline is public — main landing page */}
        <Route path="/timeline" element={<TimelinePage />} />

        {/* Root -> timeline */}
        <Route path="/" element={<Navigate to="/timeline" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
