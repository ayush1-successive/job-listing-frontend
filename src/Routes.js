import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, ErrorPage, Login, Profile, Register } from "./components";
import { View as JobView } from "./modules/job";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard/*" element={<Dashboard />} />
      <Route path="/jobs/:jobId" element={<JobView />} />
      <Route path="profile" element={<Profile />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
