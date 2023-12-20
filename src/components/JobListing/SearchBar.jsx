import React, { useState } from "react";
import { Input, Button } from "antd";

const { Search } = Input;

const SearchBox = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <div
      style={{
        marginBottom: 16,
        padding: "10px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Search
        placeholder="Search jobs..."
        enterButton={<Button type="primary">Search</Button>}
        size="large"
        onSearch={handleSearch}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{
          background: "#1890ff",
          border: "none",
          borderRadius: "4px",
          width: "100%",
        }}
      />
    </div>
  );
};

export default SearchBox;
