import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, List, Popconfirm } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "../../../components/Account/Context";
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
  const { isAuth } = useContext(AuthenticationContext);

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

  const queryFilters = () => {
    const query = Object.entries(filters).reduce((acc, [key, value]) => {
      const newValue = Array.isArray(value) ? value.join(",") : value;
      return newValue ? { ...acc, [key]: newValue } : acc;
    }, {});

    if (query.salary === "2,50") {
      delete query.salary;
    }

    return query;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/jobs/?`, {
        params: {
          ...queryFilters(),
          page: currentPage,
          limit: itemsPerPage,
          fields: fields.join(","),
        },
      });

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
      await axios.delete(`http://localhost:8080/jobs/${jobId}`);

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
    <div style={{ padding: 20, minHeight: "80vh" }}>
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
        renderItem={(item, index) => (
          <List.Item
            key={item.title}
            extra={
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Link to={`/jobs/${item._id}`}>
                  <Button
                    data-testid={`view-button-${index}`}
                    style={buttonStyle}
                  >
                    <EyeOutlined />
                  </Button>
                </Link>

                {isAuth && (
                  <>
                    <Link to={`/edit/${item._id}`}>
                      <Button
                        data-testid={`edit-button-${index}`}
                        style={buttonStyle}
                      >
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
                      <Button
                        data-testid={`delete-button-${index}`}
                        style={buttonStyle}
                      >
                        <DeleteOutlined />
                      </Button>
                    </Popconfirm>
                  </>
                )}
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
                  {item.address && (
                    <p>{`Job Location: ${item.address.city}, ${item.address.state}`}</p>
                  )}
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
