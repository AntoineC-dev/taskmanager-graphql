import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import {
  DashboardPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  PasswordResetPage,
  ProfilePage,
  RegisterPage,
  VerifyPage,
} from "../pages";
import { APP_ROUTES } from "./APP_ROUTES";
import { Layout, ProtectedRoute, PublicRoute } from "../components";

export const Router = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path={APP_ROUTES.home} element={<Layout />}>
          <Route index element={<HomePage />} />
          {/** Public routes */}
          <Route path={APP_ROUTES.register} element={<PublicRoute Element={RegisterPage} />} />
          <Route path={APP_ROUTES.login} element={<PublicRoute Element={LoginPage} />} />
          {/** Protected routes */}
          <Route path={APP_ROUTES.dashboard} element={<ProtectedRoute Element={DashboardPage} />} />
          <Route path={APP_ROUTES.profile} element={<ProtectedRoute Element={ProfilePage} />} />
        </Route>
        <Route path={APP_ROUTES.verify} element={<VerifyPage />} />
        <Route path={APP_ROUTES.passwordReset} element={<PasswordResetPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};
