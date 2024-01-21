import {
  ArrowUpOutlined,
  InboxOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Card,
  Col,
  Divider,
  Row,
  Spin,
  Statistic,
  Typography,
  Upload,
  message,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import UploadHistory from "./History";

const formatter = (value) => <CountUp end={value} separator="," />;

const BulkUpload = () => {
  const [loading, setLoading] = useState(true);
  const [joblistingCount, setJobListingCount] = useState(0);
  const [toFetchHistory, setToFetchHistory] = useState(true);

  const props = {
    name: "file",
    action: "http://localhost:8080/jobs/upload",
    accept: ".csv",
    beforeUpload: (file) => {
      if (file.type !== "text/csv") {
        message.error(
          `Invalid file type for ${file.name}. Please upload only CSV files.`
        );
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    async onChange(info) {
      const { status, name } = info.file;

      fetchUploadCount();
      setToFetchHistory(true);

      if (status === "done") {
        message.success(`${name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      format: (percent) => percent && `${parseFloat(percent.toFixed(1))}%`,
      style: { width: "97%" },
    },
    listType: "picture",
  };

  const fetchUploadCount = async () => {
    try {
      const response = await axios.get("http://localhost:8080/jobs/count");

      console.log(response.data.data);
      setJobListingCount(response?.data?.data.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReload = () => {
    setLoading(true);
    setToFetchHistory(true);
  };

  useEffect(() => {
    if (loading) {
      fetchUploadCount();
    }
  }, [loading]);

  return (
    <div>
      <Row gutter={12} style={{ justifyContent: "center", marginBottom: 20 }}>
        <Col span={5}>
          <Card
            bordered={false}
            hoverable
            style={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
          >
            <Statistic
              title="Active Job Listings"
              value={joblistingCount}
              formatter={formatter}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix={
                loading ? (
                  <Spin style={{ fontSize: 20, marginLeft: 12 }} />
                ) : (
                  <ReloadOutlined
                    onClick={handleReload}
                    style={{
                      fontSize: 20,
                      marginLeft: 12,
                      color: "black",
                      cursor: "pointer",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "blue")}
                    onMouseLeave={(e) => (e.target.style.color = "black")}
                  />
                )
              }
            />
          </Card>
        </Col>
      </Row>

      <Upload.Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading banned files.
        </p>
      </Upload.Dragger>

      <Divider orientation="left" orientationMargin={20}>
        <Typography.Title level={4}>Upload History</Typography.Title>
      </Divider>

      <UploadHistory toFetchHistory={toFetchHistory} setToFetchHistory={setToFetchHistory} />
    </div>
  );
};

export default BulkUpload;
