import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, ErrorPage, Login, Profile, Register } from "../components";
import { View as JobView, Edit as JobEdit } from "../modules/job";
import { ProtectedRoute, PublicRoute } from "./auth";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route
        path="dashboard/*"
        element={
          <PublicRoute>
            <Dashboard />
          </PublicRoute>
        }
      />
      <Route path="/jobs/:jobId" element={<JobView />} />
      <Route
        path="/edit/:jobId"
        element={
          <ProtectedRoute>
            <JobEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
