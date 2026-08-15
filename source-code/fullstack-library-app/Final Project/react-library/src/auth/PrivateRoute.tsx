import { Navigate } from "react-router-dom";
import { SpinnerLoading } from "../components/SpinnerLoading";
import { useAuth } from "./AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, initialized } = useAuth();

  if (!initialized) {
    return <SpinnerLoading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
