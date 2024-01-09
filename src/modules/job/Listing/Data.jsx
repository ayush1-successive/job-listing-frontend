import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Layout, List, Menu, Popconfirm, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { filterTypes } from "./filters";

const fields = ["title", "company", "logo", "salary", "address", "description"];

const ListingData = () => {
  // const [filters, setFilters] = useState({});

  const [jobListing, setJobListing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const handleFilterClick = (filterType) => {
  //   setFilter(filterType);
  // };

  const buttonStyle = {
    fontSize: "22px",
    height: "auto",
    width: "auto",
    color: "#1e5fd6",
    margin: "8px",
  };

  const fetchData = async () => {
    const options = {
      method: "GET",
      url: `http://localhost:8080/jobs/filters?page=${currentPage}&limit=${itemsPerPage}&fields=${fields.join(
        ","
      )}`,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setJobListing(response.data.data.data);
      setTotalCount(response.data.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  const deleteJobListing = async (jobId) => {
    console.log("id:", jobId);

    try {
      const response = await axios.delete(
        `http://localhost:8080/jobs/${jobId}`
      );

      console.log(response.data);

      await fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setItemsPerPage(size);
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
              style={{ width: "90%" }}
              pagination={{
                size: "small",
                align: "center",
                pageSize: itemsPerPage,
                total: totalCount,
                onChange: handlePageChange,
                pageSizeOptions: [5, 10, 20, 50],
              }}
              dataSource={jobListing}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  extra={
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Link to={`/jobs/${item.title}/${item.company}`}>
                        <Button style={buttonStyle}>
                          <EyeOutlined />
                        </Button>
                      </Link>

                      <Button style={buttonStyle}>
                        <EditOutlined/>
                      </Button>

                      <Popconfirm
                        title="Delete the listing"
                        description="Are you sure to delete this job-listing?"
                        placement="left"
                        onConfirm={() => deleteJobListing(item._id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button style={buttonStyle}>
                          <DeleteOutlined />
                        </Button>
                      </Popconfirm>
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
