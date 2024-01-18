import {
  ArrowUpOutlined,
  InboxOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  List,
  Modal,
  Row,
  Spin,
  Statistic,
  Typography,
  Upload,
  message,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

const fontStyle = {
  completed: {
    fontSize: 19,
    color: "#3f8600",
  },
  running: {
    fontSize: 19,
    color: "#ada424",
  },
  failed: {
    fontSize: 19,
    color: "#cf1322",
  },
};

const formatter = (value) => <CountUp end={value} separator="," />;

const formatMilliseconds = (value) => {
  if (value < 1000) return `${Math.floor(value)} ms`;

  const totalSeconds = Math.floor(value / 1000);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
};

const BulkUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [joblistingCount, setJobListingCount] = useState(0);
  const [uploadHistory, setUploadHistory] = useState([]);
  const [modalData, setModalData] = useState({});

  const fetchModalData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/bulk-upload/${id}`
      );

      const data = response.data.data;
      data.time = formatMilliseconds(data.time);
      data.createdAt = dayjs(data.createdAt).format("MMMM Do YYYY, h:mm:ss a");
      data.updatedAt = dayjs(data.updatedAt).format("MMMM Do YYYY, h:mm:ss a");

      if (data.endedAt) {
        data.endedAt = dayjs(data.endedAt).format("MMMM Do YYYY, h:mm:ss a");
      }

      setModalData(data);
    } catch (error) {
      console.error(error);
    }
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

  const fetchUploadData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/bulk-upload");

      console.log(response.data.data);
      setUploadHistory(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = async (id) => {
    await fetchModalData(id);

    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (loading) {
      fetchUploadCount();
      fetchUploadData();
    }
  }, [loading]);

  useEffect(() => {
    fetchUploadData();
  }, []);

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

      await fetchUploadCount();
      await fetchUploadData();

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

  const handleReload = async () => {
    setLoading(true);
  };

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

      <List
        itemLayout="vertical"
        size="small"
        dataSource={uploadHistory}
        renderItem={(item) => (
          <List.Item
            key={item._id}
            extra={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Button type="primary" onClick={() => showModal(item._id)}>
                  View
                </Button>
                <Modal
                  title={`Record-${item._id}`}
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleOk}
                >
                  <pre>{JSON.stringify(modalData, null, 2)}</pre>
                </Modal>
              </div>
            }
          >
            <List.Item.Meta
              title={`Record ID - ${item._id}`}
              description={
                <Row gutter={24}>
                  <Col span={5}>
                    <Statistic
                      title="Filename"
                      value={item.filename}
                      valueStyle={fontStyle[item.status]}
                    />
                  </Col>
                  <Col span={4}>
                    <Statistic
                      title="status"
                      value={item.status}
                      valueStyle={fontStyle[item.status]}
                    />
                  </Col>
                  <Col span={5}>
                    <Statistic
                      title="Entries Completed"
                      value={item.entriesCompleted}
                      valueStyle={fontStyle[item.status]}
                    />
                  </Col>
                  <Col span={5}>
                    <Statistic
                      title="Total Entries"
                      value={item.totalEntries}
                      valueStyle={fontStyle[item.status]}
                    />
                  </Col>
                  <Col span={4}>
                    <Statistic
                      title="time"
                      value={item.time}
                      valueStyle={fontStyle[item.status]}
                      formatter={formatMilliseconds}
                    />
                  </Col>
                </Row>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default BulkUpload;
