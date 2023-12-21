import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ErrorPage, Dashboard, Profile } from "./components";
import { Register } from "./components/Register";
import { Login } from "./components/Login";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard/*" element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
