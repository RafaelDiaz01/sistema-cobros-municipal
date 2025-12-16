import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Contribuyentes from "../pages/Contribuyentes";

const AppRouter = () => {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/contribuyentes" element={<Contribuyentes />} />
      </Routes>
  );
};

export default AppRouter;
