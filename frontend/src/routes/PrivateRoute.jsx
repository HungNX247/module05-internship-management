import { Navigate } from "react-router-dom";
import {
  ensureDevHrAuthForMock,
  isAuthenticated,
} from "../services/tokenService";

function PrivateRoute({ children }) {
  ensureDevHrAuthForMock();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
