import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorPage } from "../../../components";
import { JobForm } from "../Form";

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
        const apiUrl = `http://localhost:8080/jobs/${jobId}`;
        const response = await axios.get(apiUrl);

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
    <div style={{ maxWidth: "80%", margin: "auto" }}>
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
