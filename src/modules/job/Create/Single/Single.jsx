import React, { useContext } from "react";
import { MenuKeyContext } from "../../../navbar";
import { UploadForm } from "../../Form";
import "./single.css";

const SingleUpload = () => {
  const { setDashboardMenuKey } = useContext(MenuKeyContext);

  const uploadSuccess = () => {
    setDashboardMenuKey("jobs");
  };

  return (
    <div className="singleUploadForm">
      <UploadForm
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
