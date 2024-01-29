import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorPage } from "../../../components";
import apiInstance from "../../../services/api";
import { JobForm } from "../Form";
import "./edit.css";

const Edit = () => {
  const { jobId } = useParams();
  const [jobListing, setJobListing] = useState({});
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();

  const uploadSuccess = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiInstance.get(`/jobs/${jobId}`);

        const jobListing = response?.data?.data;
        jobListing.applicationDeadline = dayjs(jobListing.applicationDeadline);

        setJobListing(jobListing);
      } catch (error) {
        setNotFound(true);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [jobId]);

  if (notFound) {
    return <ErrorPage />;
  }
  return (
    <div className="editUploadForm">
      <JobForm
        formHeading={"Edit JobListing"}
        jobListing={jobListing}
        submitMessage="Update Job"
        requestMethod="PUT"
        requestApi={`http://localhost:8080/jobs/${jobId}`}
        uploadSuccess={uploadSuccess}
      />
    </div>
  );
};

export default Edit;
