import { Card, Descriptions, Divider, Modal, Table, Typography } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import apiInstance from "../../../../services/api";

const ErrorDetail = (props) => {
  const { recordId, formatMilliseconds } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [errorData, setErrorData] = useState({});

  const fontStyle = {
    fontSize: "15px",
  };

  const column = [
    { title: "Row Number", dataIndex: "rowNumber", key: "rowNumber" },
    { title: "Message", dataIndex: "message", key: "message" },
  ];

  const handleOk = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchErrorDetail = async () => {
      try {
        const response = await apiInstance.get(`bulk-upload/${recordId}`);

        const data = response.data.data;
        data.time = formatMilliseconds(data.time);
        data.createdAt = dayjs(data.createdAt).format(
          "MMMM Do YYYY, h:mm:ss a"
        );
        data.updatedAt = dayjs(data.updatedAt).format(
          "MMMM Do YYYY, h:mm:ss a"
        );

        if (data.endedAt) {
          data.endedAt = dayjs(data.endedAt).format("MMMM Do YYYY, h:mm:ss a");
        }

        setErrorData(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (!recordId) return;

    setIsOpen(true);

    fetchErrorDetail();
  }, [recordId]);

  return (
    <div>
      <Modal
        title={`Record ID - ${errorData._id}`}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleOk}
        width={"60%"}
      >
        <Card style={{ fontSize: "15px" }}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Filename" style={fontStyle}>
              {errorData.filename}
            </Descriptions.Item>
            <Descriptions.Item label="Status" style={fontStyle}>
              {errorData.status}
            </Descriptions.Item>
            <Descriptions.Item label="Time" style={fontStyle}>
              {errorData.time}
            </Descriptions.Item>
            <Descriptions.Item label="Status" style={fontStyle}>
              {errorData.status}
            </Descriptions.Item>
            <Descriptions.Item label="Successful Entries" style={fontStyle}>
              {errorData.successfulEntries}
            </Descriptions.Item>
            <Descriptions.Item label="Failed Entries" style={fontStyle}>
              {errorData.failedEntries}
            </Descriptions.Item>
            <Descriptions.Item label="Entries Completed" style={fontStyle}>
              {errorData.entriesCompleted}
            </Descriptions.Item>
            <Descriptions.Item label="Total Entries" style={fontStyle}>
              {errorData.totalEntries}
            </Descriptions.Item>
            <Descriptions.Item label="createdAt" style={fontStyle}>
              {errorData.createdAt}
            </Descriptions.Item>
            <Descriptions.Item label="updatedAt" style={fontStyle}>
              {errorData.updatedAt}
            </Descriptions.Item>
            {errorData.endedAt && (
              <Descriptions.Item label="endedAt" style={fontStyle}>
                {errorData.endedAt}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Card>
        {errorData.errorDetails?.length > 0 && (
          <>
            <Divider orientation="left" orientationMargin={20}>
              <Typography.Title level={4}>Error details</Typography.Title>
            </Divider>
            <Table
              dataSource={errorData.errorDetails}
              columns={column}
              pagination={{ pageSize: 10 }}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

ErrorDetail.propTypes = {
  recordId: PropTypes.string.isRequired,
  formatMilliseconds: PropTypes.func.isRequired,
};

export default ErrorDetail;
