import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ErrorPage, Dashboard, Profile, Login, Register } from "./components";
import { Detail } from "./modules/job/Detail";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard/*" element={<Dashboard />} />
      <Route path="/jobs/:title/:company" element={<Detail />} />
      <Route path="profile" element={<Profile />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
