import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import { Homepage } from "../pages";

export const Router = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<Homepage />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};
