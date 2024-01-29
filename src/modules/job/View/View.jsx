import { Card, Descriptions, List, Tag, Typography } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorPage } from "../../../components";
import apiInstance from "../../../services/api";
import "./view.css";

const { Title, Paragraph, Text } = Typography;

const View = () => {
  const { jobId } = useParams();
  const [jobListing, setJobListing] = useState({});
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiInstance.get(`/jobs/${jobId}`);
        const jobData = response.data?.data;

        if (jobData.address) {
          jobData.address = `${jobData.address.city}, ${jobData.address.state}`;
        }

        console.log(jobData);

        setJobListing(jobData);
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
    <div className="view-container">
      <Card
        title={`${jobListing.title} (${jobListing.company})`}
        extra={
          <img
            src={jobListing.logo}
            alt={`${jobListing.title} Logo`}
            style={{ maxHeight: 50 }}
          />
        }
        style={{ borderRadius: 12 }}
        className="view-card"
      >
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Job Type" className="view-text">
            {jobListing.jobType}
          </Descriptions.Item>
          <Descriptions.Item label="Industry" className="view-text">
            {jobListing.industry}
          </Descriptions.Item>
          <Descriptions.Item label="Salary" className="view-text">
            {`₹ ${jobListing.salary} lpa`}
          </Descriptions.Item>
          <Descriptions.Item label="Location" className="view-text">
            {jobListing.address}
          </Descriptions.Item>
          <Descriptions.Item label="Remote" className="view-text">
            {jobListing.isRemote ? "Yes" : "No"}
          </Descriptions.Item>
          <Descriptions.Item label="Application Deadline" className="view-text">
            {dayjs(jobListing.applicationDeadline).format("Do MMMM, YYYY")}
          </Descriptions.Item>
        </Descriptions>

        <Title level={3}>Job Description</Title>
        <Paragraph className="view-text">{jobListing.description}</Paragraph>

        <Title level={3}>Qualifications</Title>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Min Education" className="view-text">
            {jobListing.qualifications?.education}
          </Descriptions.Item>
          <Descriptions.Item label="Skills" className="view-text">
            {jobListing.qualifications?.skills?.map((skill) => (
              <Tag className="view-text" key={`${skill}`}>
                {skill}
              </Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="Min Experience" className="view-text">
            {jobListing.qualifications?.minExperience} years
          </Descriptions.Item>
          <Descriptions.Item label="Max Experience" className="view-text">
            {jobListing.qualifications?.maxExperience} years
          </Descriptions.Item>
        </Descriptions>

        {jobListing.requirements?.length > 0 && (
          <>
            <Title level={3}>Requirements</Title>
            <List
              dataSource={jobListing.requirements}
              renderItem={(requirement) => (
                <List.Item className="hover-highlight">
                  <Text className="view-text">{requirement}</Text>
                </List.Item>
              )}
            />
          </>
        )}

        {jobListing.responsibilities?.length > 0 && (
          <>
            <Title level={3}>Responsibilities</Title>
            <List
              dataSource={jobListing.responsibilities}
              renderItem={(responsibility) => (
                <List.Item className="hover-highlight">
                  <Text className="view-text">{responsibility}</Text>
                </List.Item>
              )}
            />
          </>
        )}

        <Title level={3}>Contact Information</Title>
        <Paragraph className="view-text">
          Email: {jobListing.contactEmail}
        </Paragraph>

        <Title level={3}>Apply Now</Title>
        {jobListing.applicationLink ? (
          <Link to={jobListing.applicationLink} className="view-text">
            Apply Here
          </Link>
        ) : (
          <Paragraph className="view-text">
            No application link provided.
          </Paragraph>
        )}
      </Card>
    </div>
  );
};

export default View;
