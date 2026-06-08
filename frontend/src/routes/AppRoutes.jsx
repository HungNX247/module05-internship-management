import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import HrDashboardPage from "../pages/hr/HrDashboardPage";
import MentorDashboardPage from "../pages/mentor/MentorDashboardPage";
import InternDashboardPage from "../pages/intern/InternDashboardPage";
import InternApplyPage from "../pages/intern/InternApplyPage";
import InternProfilePage from "../pages/intern/InternProfilePage";
import UserListPage from "../pages/admin/users/UserListPage";
import UserFormPage from "../pages/admin/users/UserFormPage";
import HrInternListPage from "../pages/hr/interns/HrInternListPage";
import HrInternDetailPage from "../pages/hr/interns/HrInternDetailPage";
import MentorListPage from "../pages/hr/mentors/MentorListPage";
import MentorAssignPage from "../pages/hr/mentors/MentorAssignPage";
import MentorWorkloadPage from "../pages/hr/mentors/MentorWorkloadPage";
import ForbiddenPage from "../pages/ForbiddenPage";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/403" element={<ForbiddenPage />} />

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
        path="/admin/users"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["ADMIN"]}>
              <UserListPage />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/users/create"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["ADMIN"]}>
              <UserFormPage />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/users/:id/edit"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["ADMIN"]}>
              <UserFormPage />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/hr/dashboard"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["ADMIN", "HR"]}>
              <HrDashboardPage />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/hr/interns"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["ADMIN", "HR"]}>
              <HrInternListPage />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/hr/interns/:id"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["ADMIN", "HR"]}>
              <HrInternDetailPage />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/hr/mentors"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["ADMIN", "HR"]}>
              <MentorListPage />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/hr/mentor-assignment"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["ADMIN", "HR"]}>
              <MentorAssignPage />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/hr/mentor-workload"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["ADMIN", "HR"]}>
              <MentorWorkloadPage />
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

      <Route
        path="/intern/apply"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["INTERN"]}>
              <InternApplyPage />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/intern/profile"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["INTERN"]}>
              <InternProfilePage />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<h2>404 - Không tìm thấy trang</h2>} />
    </Routes>
  );
}

export default AppRoutes;
