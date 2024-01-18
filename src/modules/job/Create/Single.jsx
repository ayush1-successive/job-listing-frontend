import React from "react";
import { JobForm } from "../Form";

const SingleUpload = () => {
  const uploadSuccess = () => {
    window.location.reload();
  };

  return (
    <div style={{ maxWidth: "80%", margin: "auto" }}>
      <JobForm
        formHeading={"Create JobListing"}
        submitMessage="Create Job"
        requestMethod="POST"
        requestApi={`http://localhost:8080/jobs`}
        uploadSuccess={uploadSuccess}
      />
    </div>
  );
};

export default SingleUpload;
