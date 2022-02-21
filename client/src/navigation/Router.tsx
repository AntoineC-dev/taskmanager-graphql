import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import { Layout } from "../containers";
import { HomePage, RegisterPage } from "../pages";

export const Router = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </RouterRoutes>
    </BrowserRouter>
  );
};
