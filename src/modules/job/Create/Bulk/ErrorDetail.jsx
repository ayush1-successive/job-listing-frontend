import { Card, Descriptions, Divider, Modal, Table, Typography } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import apiInstance from "../../../../services/api";
import "./bulk.css";

const ErrorDetail = (props) => {
  const { recordId, formatMilliseconds } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [errorData, setErrorData] = useState({});

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
        <Card>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Filename" className="bulk-text">
              {errorData.filename}
            </Descriptions.Item>
            <Descriptions.Item label="Status" className="bulk-text">
              {errorData.status}
            </Descriptions.Item>
            <Descriptions.Item label="Time" className="bulk-text">
              {errorData.time}
            </Descriptions.Item>
            <Descriptions.Item label="Status" className="bulk-text">
              {errorData.status}
            </Descriptions.Item>
            <Descriptions.Item label="Successful Entries" className="bulk-text">
              {errorData.successfulEntries}
            </Descriptions.Item>
            <Descriptions.Item label="Failed Entries" className="bulk-text">
              {errorData.failedEntries}
            </Descriptions.Item>
            <Descriptions.Item label="Entries Completed" className="bulk-text">
              {errorData.entriesCompleted}
            </Descriptions.Item>
            <Descriptions.Item label="Total Entries" className="bulk-text">
              {errorData.totalEntries}
            </Descriptions.Item>
            <Descriptions.Item label="createdAt" className="bulk-text">
              {errorData.createdAt}
            </Descriptions.Item>
            <Descriptions.Item label="updatedAt" className="bulk-text">
              {errorData.updatedAt}
            </Descriptions.Item>
            {errorData.endedAt && (
              <Descriptions.Item label="endedAt" className="bulk-text">
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
