import React, { useContext } from "react";
import { Input, Button } from "antd";
import { FilterContext } from ".";

const { Search } = Input;

const SearchBox = () => {
  const { filters, setFilters } = useContext(FilterContext);

  // const handleSearch = (value) => {
  //   setFilters({...filters, searchText: value});
  // };

  return (
    <div
      style={{
        padding: 10,
        borderRadius: 8,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Search
        placeholder="Search jobs by Title..."
        enterButton={<Button type="primary">Find Jobs</Button>}
        size="large"
        // onSearch={handleSearch}
        // onChange={(e) => setFilters({ ...filters, searchText: e.target.value })}
        style={{
          background: "#1890ff",
          border: "none",
          borderRadius: "4px",
          width: "40%",
        }}
      />
    </div>
  );
};

export default SearchBox;
