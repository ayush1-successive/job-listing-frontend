import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Layout, List, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { filterTypes } from "./filters";

const ListingData = () => {
  // const [filter, setFilter] = useState({});

  const [jobListing, setJobListing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

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
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
                current: currentPage,
                onChange: handlePageChange,
                pageSize: pageSize,
                size: "small",
                showSizeChanger: false,
                total: undefined,
                align: "center",
              }}
              dataSource={jobListing}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  extra={
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Link to ={`${item.title}/${item.company}`}>
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
                    title={item.title}
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
