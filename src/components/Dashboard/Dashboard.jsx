import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { JobListing, JobUpload } from "../../modules/job";
import "./navbar.css";

const navbarItems = [
  { key: "jobs", label: "Jobs" },
  { key: "uploads", label: "Uploads" },
];

const componentMap = {
  jobs: <JobListing />,
  uploads: <JobUpload />,
};

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("jobs");

  return (
    <>
      <nav className="navbar" style={{ zIndex: 999 }}>
        <Layout>
          <Layout.Header className="nav-header">
            <div className="logo">
              <h3 className="brand-font">JobNest</h3>
            </div>
            <div className="navbar-menu">
              <div className="leftMenu">
                <Menu
                  mode={"horizontal"}
                  selectedKeys={selectedMenuItem}
                  items={navbarItems}
                  onClick={(e) => setSelectedMenuItem(e.key)}
                />
              </div>
              <div className="rightMenu">
                <Menu mode={"horizontal"}>
                  <Menu.SubMenu title={<Avatar icon={<UserOutlined />} />}>
                    <Menu.Item key="profile">
                      <UserOutlined /> <Link to="/profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="log-in">
                      <LogoutOutlined /> <Link to="/login">Login</Link>
                    </Menu.Item>
                  </Menu.SubMenu>
                </Menu>
              </div>
            </div>
          </Layout.Header>
          <Content style={{ padding: "0 24px", minHeight: 280, marginTop: 25 }}>
            {componentMap[selectedMenuItem]}
          </Content>
        </Layout>
      </nav>
    </>
  );
};

export default Dashboard;
