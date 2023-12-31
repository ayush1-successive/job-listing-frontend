import React from "react";
import { Navigation } from "../Navigation";
import { Route, Routes } from "react-router-dom";
import { JobListing, JobUpload } from "../../modules/job";
import { Detail } from "../../modules/job/Detail";
import { ErrorPage } from "../ErrorPage";

const Dashboard = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="jobs" element={<JobListing />} />
        <Route path="jobs/:title/:company" element={<Detail />} />
        <Route path="uploads" element={<JobUpload />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default Dashboard;
