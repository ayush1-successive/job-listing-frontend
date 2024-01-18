import { FileAddOutlined, UploadOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useContext } from "react";
import { MenuKeyContext } from "../../../components/MenuKey/Context";
import BulkUpload from "./Bulk";
import SingleUpload from "./Single";

const { Content, Sider } = Layout;

const Create = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { uploadMenuKey, setUploadMenuKey } = useContext(MenuKeyContext);

  const sidebarItems = [
    {
      key: "upload-single",
      label: "Post Job",
      icon: <UploadOutlined />,
    },
    {
      key: "upload-bulk",
      label: "Bulk Upload",
      icon: <FileAddOutlined />,
    },
  ];

  const componentMap = {
    "upload-single": <SingleUpload />,
    "upload-bulk": <BulkUpload />,
  };

  const handleMenuKey = (e) => {
    sessionStorage.setItem("uploadMenuKey", e.key);
    setUploadMenuKey(e.key);
  };

  return (
    <Content style={{ padding: 12 }}>
      <Layout>
        <Sider
          style={{
            background: colorBgContainer,
            borderRadius: 12,
            marginRight: "10px",
          }}
          width={220}
        >
          <Menu
            items={sidebarItems}
            selectedKeys={uploadMenuKey}
            onClick={handleMenuKey}
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          />
        </Sider>

        <Content
          style={{
            background: colorBgContainer,
            borderRadius: 12,
          }}
        >
          {componentMap[uploadMenuKey]}
        </Content>
      </Layout>
    </Content>
  );
};

export default Create;
