import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, List, Menu, Space, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";

import React, { useEffect, useState } from "react";
import { filterTypes } from "./filters";
import axios from "axios";
import { Link } from "react-router-dom";

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ListingData = () => {
  // const [filter, setFilter] = useState({});

  const [jobListing, setJobListing] = useState([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const handleFilterClick = (filterType) => {
  //   setFilter(filterType);
  // };

  const iconStyle = {
    fontSize: "22px",
    color: "#1e5fd6",
    background: "#f0f0f0",
    padding: "8px",
    borderRadius: "4px",
    margin: "8px",
  };

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "http://localhost:8080/jobs",
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        setJobListing(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Content style={{ padding: "0 0" }}>
        <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              style={{ height: "100%" }}
              items={filterTypes}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <List
              itemLayout="vertical"
              size="small"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 5,
              }}
              dataSource={jobListing}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  extra={
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Link to="">
                        <EyeOutlined style={iconStyle} />
                      </Link>
                      <EditOutlined style={iconStyle} />
                      <DeleteOutlined style={iconStyle} />
                    </div>
                  }
                >
                  <List.Item.Meta
                    avatar={
                      <img
                        alt="Logo"
                        src={item.logo}
                        style={{ width: "96px", height: "96px" }}
                      />
                    }
                    title={<a href={item.href}>{item.title}</a>}
                    description={
                      <div>
                        <p>{`Company: ${item.company}`}</p>
                        <p>{`Salary: ${item.salary.amount} ${item.salary.currency} ${item.salary.periodicity}`}</p>
                        <p>{`Job Location: ${item.address.city}, ${item.address.state}, ${item.address.country}`}</p>
                      </div>
                    }
                  />
                  <p>{`Description: ${item.description}`}</p>
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Content>
    </div>
  );
};

export default ListingData;
