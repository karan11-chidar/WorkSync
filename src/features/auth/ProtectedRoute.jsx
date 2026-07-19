import { useAuth } from "./AuthContext";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({allowedRoles}) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
