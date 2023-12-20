import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ErrorPage,
  Home,
  JobListing,
  JobUpload,
  Profile,
} from "./components";
import { Register } from "./components/Register";
import { Login } from "./components/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="jobs" element={<JobListing />} />
        <Route path="uploads" element={<JobUpload />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
