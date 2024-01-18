import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, List, Popconfirm } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListingContext } from "./Context";

const fields = [
  "_id",
  "title",
  "company",
  "logo",
  "salary",
  "address",
  "description",
];

const buttonStyle = {
  fontSize: "22px",
  height: "auto",
  width: "auto",
  color: "#1e5fd6",
  margin: "8px",
};

const ItemsData = () => {
  const {
    toFetch,
    setToFetch,
    filters,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  } = useContext(ListingContext);

  const [jobListing, setJobListing] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async () => {
    const queryFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      console.log(value);
      return value.length > 0 ? acc + `${key}=${value.join(",")}&` : acc;
    }, "");

    const options = {
      method: "GET",
      url: `http://localhost:8080/jobs/?${queryFilters}page=${currentPage}&limit=${itemsPerPage}&fields=${fields.join(
        ","
      )}`,
    };

    try {
      const response = await axios.request(options);

      setJobListing(response.data.data.data);
      setTotalCount(response.data.data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setToFetch(false);
    }
  };

  useEffect(() => {
    if (toFetch) {
      fetchData();
    }
  }, [toFetch]);

  const deleteJobListing = async (jobId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/jobs/${jobId}`
      );

      console.log(response.data);

      setToFetch(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setItemsPerPage(size);
    setToFetch(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <List
        itemLayout="vertical"
        size="small"
        style={{ width: "90%" }}
        pagination={{
          size: "small",
          align: "center",
          pageSize: itemsPerPage,
          total: totalCount,
          current: currentPage,
          onChange: handlePageChange,
          pageSizeOptions: [5, 10, 20, 50],
        }}
        dataSource={jobListing}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            extra={
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Link to={`/jobs/${item._id}`}>
                  <Button style={buttonStyle}>
                    <EyeOutlined />
                  </Button>
                </Link>

                <Link to={`/edit/${item._id}`}>
                  <Button style={buttonStyle}>
                    <EditOutlined />
                  </Button>
                </Link>

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
                  <p>{`Salary: ₹ ${item.salary} / annually`}</p>
                  <p>{`Job Location: ${item.address.city}, ${item.address.state}`}</p>
                </div>
              }
            />
            <p>{`Description: ${item.description}`}</p>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ItemsData;
