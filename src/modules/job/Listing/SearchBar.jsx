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
        placeholder="Search jobs by Title..."
        enterButton={<Button type="primary">Search</Button>}
        size="large"
        onSearch={handleSearch}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{
          background: "#1890ff",
          border: "none",
          borderRadius: "4px",
          width: "90%",
        }}
      />
    </div>
  );
};

export default SearchBox;
