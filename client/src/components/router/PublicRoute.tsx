import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "../../hooks";
import { APP_ROUTES } from "../../navigation";

interface PublicRouteProps {
  Element: () => JSX.Element;
}

export const PublicRoute = ({ Element }: PublicRouteProps) => {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) {
    return <Navigate to={APP_ROUTES.dashboard} />;
  } else {
    return <Element />;
  }
};
