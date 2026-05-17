import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/tokenService";

function PrivateRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
