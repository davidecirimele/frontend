import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/dashboardLayout/MainLayout";
import { routes } from "../routes";

function DashboardNew() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {routes}
      </Route>
    </Routes>
  );
}

export default DashboardNew;
