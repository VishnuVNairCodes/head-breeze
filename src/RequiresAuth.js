import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/auth-context";

const RequiresAuth = ({ children }) => {
  const location = useLocation();
  const {
    currentAuthInfo: { token },
  } = useAuth();
  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export { RequiresAuth };
