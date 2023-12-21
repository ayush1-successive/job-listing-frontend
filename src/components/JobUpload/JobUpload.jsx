import { Layout, List, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import React from "react";
import sidebarItems from "./Sidebar";

const JobUpload = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout>
        <Content style={{ padding: "0 0" }}>
          <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                style={{ height: "100%" }}
                items={sidebarItems}
                defaultSelectedKeys={["upload-single"]}
              />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <List itemLayout="vertical" size="small" />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
};

export default JobUpload;
