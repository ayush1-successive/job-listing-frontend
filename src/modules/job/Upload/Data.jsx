import { FileAddOutlined, UploadOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";

import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";

import React, { useState } from "react";
import BulkUpload from "./BulkUpload";
import PostJob from "./PostJob";

const PostingData = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedMenuItem, setSelectedMenuItem] = useState("upload-single");

  const sidebarItems = [
    {
      key: "upload-single",
      label: "upload-single",
      icon: <UploadOutlined />,
    },
    {
      key: "bulk-upload",
      label: "bulk-upload",
      icon: <FileAddOutlined />,
    },
  ];

  const componentMap = {
    "upload-single": <PostJob />,
    "bulk-upload": <BulkUpload />,
  };

  return (
    <div>
      <Content style={{ padding: "0 0" }}>
        <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }}>
            <Menu
              style={{ width: 212 }}
              items={sidebarItems}
              selectedKeys={selectedMenuItem}
              onClick={(e) => setSelectedMenuItem(e.key)}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {componentMap[selectedMenuItem]}
          </Content>
        </Layout>
      </Content>
    </div>
  );
};

export default PostingData;
