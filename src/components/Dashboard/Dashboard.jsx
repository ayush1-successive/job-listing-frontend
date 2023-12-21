import React from "react";
import { Navigation } from "../Navigation";
import { Route, Routes } from "react-router-dom";
import { JobListing, JobUpload } from "../../modules/job";

const Dashboard = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="jobs" element={<JobListing />} />
        {/* <Route path="jobs/:id" element={<} */}
        <Route path="uploads" element={<JobUpload />} />
      </Routes>
    </>
  );
};

export default Dashboard;
