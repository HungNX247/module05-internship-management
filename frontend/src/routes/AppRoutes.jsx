import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import HrDashboardPage from "../pages/hr/HrDashboardPage";
import MentorDashboardPage from "../pages/mentor/MentorDashboardPage";
import InternDashboardPage from "../pages/intern/InternDashboardPage";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["ADMIN"]}>
              <AdminDashboardPage />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/hr/dashboard"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["HR"]}>
              <HrDashboardPage />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/mentor/dashboard"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["MENTOR"]}>
              <MentorDashboardPage />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/intern/dashboard"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["INTERN"]}>
              <InternDashboardPage />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
}

export default AppRoutes;
