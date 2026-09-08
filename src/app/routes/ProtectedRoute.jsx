import { useAuth } from "../../features/auth/context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

/**
 * Restricts route access to authenticated users with an allowed role.
 *
 * @param {Object} props - Route guard props.
 * @param {string[]} props.allowedRoles - Roles permitted to access the route.
 * @returns {JSX.Element} The protected route content or redirect.
 */
function ProtectedRoute({ allowedRoles }) {
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
