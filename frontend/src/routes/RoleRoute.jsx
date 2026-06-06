import { Navigate } from "react-router-dom";
import { getCurrentRole } from "../services/tokenService";

function RoleRoute({ children, allowedRoles }) {
  const currentRole = getCurrentRole();

  if (!currentRole) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentRole)) {
    return <Navigate to="/403" replace />;
  }

  return children;
}

export default RoleRoute;
