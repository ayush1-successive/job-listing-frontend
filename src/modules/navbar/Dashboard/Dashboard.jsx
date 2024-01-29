import { UserOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Create as JobCreate, Listing as JobListing } from "../../job";
import { AuthenticationContext } from "../../user";
import { MenuKeyContext } from "../MenuKey/Context";
import "./dashboard.css";

const navbarItems = [
  { key: "jobs", label: <strong>Jobs</strong> },
  { key: "uploads", label: <strong>Uploads</strong> },
];

const componentMap = {
  jobs: <JobListing />,
  uploads: <JobCreate />,
};

const { Content, Header, Footer } = Layout;

const Dashboard = () => {
  const { isAuth } = useContext(AuthenticationContext);
  const { dashboardMenuKey, setDashboardMenuKey } = useContext(MenuKeyContext);

  const handleMenuKey = (e) => {
    sessionStorage.setItem("dashboardMenuKey", e.key);
    setDashboardMenuKey(e.key);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const rightMenuItems = [
    {
      key: "right-menu",
      label: <Avatar data-testid="user-icon" icon={<UserOutlined />} />,
      children: [
        { key: "profile", label: <Link to="/profile">Profile</Link> },
        {
          key: "auth-action",
          label: isAuth ? (
            <Link onClick={handleLogout}>Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          ),
        },
      ],
    },
  ];

  return (
    <Layout>
      <Header className="dashboard-header">
        <div className="dashboard-logo">JobNest</div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={navbarItems}
          selectedKeys={dashboardMenuKey}
          className="dashboard-menu"
          onClick={handleMenuKey}
        />
        <Menu mode={"horizontal"} items={rightMenuItems} />
      </Header>
      <Content>{componentMap[dashboardMenuKey]}</Content>
      <Footer className="dashboard-footer">
        <div className="dashboard-footer-text">
          JobNest ©{new Date().getFullYear()} Created by Ayush Sinha
        </div>
      </Footer>
    </Layout>
  );
};

export default Dashboard;
