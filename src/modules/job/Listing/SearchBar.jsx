import { Button, Input } from "antd";
import React, { useContext } from "react";
import { ListingContext } from "./Context";

const SearchBox = () => {
  const { setToFetch, filters, setFilters } = useContext(ListingContext);

  return (
    <div
      style={{
        marginBottom: 10,
        display: "flex",
        justifyContent: "center",
        borderRadius: "12px",
      }}
    >
      <Input.Search
        placeholder="Search jobs by Title..."
        enterButton={
          <Button onClick={() => setToFetch(true)} type="primary">
            Find Jobs
          </Button>
        }
        onPressEnter={() => setToFetch(true)}
        size="large"
        onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        style={{
          border: "none",
          width: "80%",
        }}
        value={filters.title}
      />
    </div>
  );
};

export default SearchBox;
