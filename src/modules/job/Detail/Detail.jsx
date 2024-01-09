import { Card, Descriptions, List, Tag, Typography } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorPage } from "../../../components";
import "./detail.css";

const { Title, Paragraph, Text } = Typography;

const Detail = () => {
  const { title, company } = useParams();
  const [jobListing, setJobListing] = useState({});
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:8080/jobs/details/?title=${title}&company=${company}`;
        const response = await axios.get(apiUrl);

        const jobListing = response?.data?.data;

        const requirements = jobListing.requirements[0].split(",");
        const responsibilities = jobListing.responsibilities[0].split(",");
        const skills = jobListing.qualifications.skills[0].split(",");

        setJobListing({
          ...jobListing,
          requirements,
          responsibilities,
          qualifications: { ...jobListing.qualifications, skills },
        });
      } catch (error) {
        if (error.response.status === 404) {
          console.log("In not found!");
          setNotFound(true);
          return;
        }
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [title, company]);

  if (notFound) {
    return <ErrorPage />;
  }

  return (
    <Card
      title={`${jobListing.title} (${jobListing.company})`}
      extra={
        <img
          src={jobListing.logo}
          alt={`${jobListing.title} Logo`}
          style={{ maxHeight: 50 }}
        />
      }
      style={{ width: "70%", margin: "auto", fontSize: "15px" }}
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Job Type" style={{ fontSize: "15px" }}>
          {jobListing.jobType}
        </Descriptions.Item>
        <Descriptions.Item label="Industry" style={{ fontSize: "15px" }}>
          {jobListing.industry}
        </Descriptions.Item>
        <Descriptions.Item label="Salary" style={{ fontSize: "15px" }}>
          {`${jobListing.salary?.amount} ${jobListing.salary?.currency} ${jobListing.salary?.periodicity}`}
        </Descriptions.Item>
        <Descriptions.Item label="Openings" style={{ fontSize: "15px" }}>
          {jobListing.openings}
        </Descriptions.Item>
        <Descriptions.Item label="Remote" style={{ fontSize: "15px" }}>
          {jobListing.isRemote ? "Yes" : "No"}
        </Descriptions.Item>
        <Descriptions.Item
          label="Application Deadline"
          style={{ fontSize: "15px" }}
        >
          {moment(jobListing.applicationDeadline).format("Do MMMM, YYYY")}
        </Descriptions.Item>
      </Descriptions>

      <Title level={3}>Job Description</Title>
      <Paragraph style={{ fontSize: "15px" }}>
        {jobListing.description}
      </Paragraph>

      <Title level={3}>Qualifications</Title>
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Min Education" style={{ fontSize: "15px" }}>
          {jobListing.qualifications?.education}
        </Descriptions.Item>
        <Descriptions.Item label="Skills" style={{ fontSize: "15px" }}>
          {jobListing.qualifications?.skills?.map((skill, index) => (
            <Tag style={{ fontSize: "15px" }} key={index}>
              {skill}
            </Tag>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Min Experience" style={{ fontSize: "15px" }}>
          {jobListing.qualifications?.minExperience} years
        </Descriptions.Item>
        <Descriptions.Item label="Max Experience" style={{ fontSize: "15px" }}>
          {jobListing.qualifications?.maxExperience} years
        </Descriptions.Item>
      </Descriptions>

      <Title level={3}>Requirements</Title>
      <List
        dataSource={jobListing.requirements}
        renderItem={(requirement) => (
          <List.Item className="hover-highlight">
            <Text style={{ fontSize: "15px" }}>{requirement}</Text>
          </List.Item>
        )}
      />

      <Title level={3}>Responsibilities</Title>
      <List
        dataSource={jobListing.responsibilities}
        renderItem={(responsibility) => (
          <List.Item className="hover-highlight">
            <Text style={{ fontSize: "15px" }}>{responsibility}</Text>
          </List.Item>
        )}
      />

      <Title level={3}>Contact Information</Title>
      <Paragraph style={{ fontSize: "15px" }}>
        Email: {jobListing.contactEmail}
      </Paragraph>

      <Title level={3}>Apply Now</Title>
      {jobListing.applicationLink ? (
        <Link to={jobListing.applicationLink} style={{ fontSize: "15px" }}>
          Apply Here
        </Link>
      ) : (
        <Paragraph style={{ fontSize: "15px" }}>
          No application link provided.
        </Paragraph>
      )}
    </Card>
  );
};

export default Detail;
