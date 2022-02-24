import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "../../hooks";
import { APP_ROUTES } from "../../navigation";

interface ProtectedRouteProps {
  Element: () => JSX.Element;
}

export const ProtectedRoute = ({ Element }: ProtectedRouteProps) => {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) {
    return <Element />;
  } else {
    return <Navigate to={APP_ROUTES.login} />;
  }
};
