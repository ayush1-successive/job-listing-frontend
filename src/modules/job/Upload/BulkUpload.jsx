import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Divider, message, Typography, Upload } from "antd";

const props = {
  name: "file",
  multiple: true,
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
  onChange(info) {
    const { status, name } = info.file;

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

const BulkUpload = () => {
  return (
    <>
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
      All previous csv uploads to be displayed here!
    </>
  );
};

// TODO: Upload history

export default BulkUpload;
