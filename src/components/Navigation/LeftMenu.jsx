import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="jobs">
        <Link to="jobs">Jobs</Link>
      </Menu.Item>
      <Menu.Item key="uploads">
        <Link to="uploads">Uploads</Link>
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
