import React from "react";
import { JobForm } from "../../Form";
import "./single.css";

const SingleUpload = () => {
  const uploadSuccess = () => {
    window.location.reload();
  };

  return (
    <div className="singleUploadForm">
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
