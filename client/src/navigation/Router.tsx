import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage, LoginPage, RegisterPage } from "../pages";
import { APP_ROUTES } from "./APP_ROUTES";

export const Router = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path={APP_ROUTES.home} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={APP_ROUTES.register} element={<RegisterPage />} />
          <Route path={APP_ROUTES.login} element={<LoginPage />} />
        </Route>
      </RouterRoutes>
    </BrowserRouter>
  );
};
