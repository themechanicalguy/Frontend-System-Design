import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  // Authentication logic to be implemented
  const isAuthenticated = false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
