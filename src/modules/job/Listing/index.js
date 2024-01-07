import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { createContext, useState } from "react";
import ListingData from "./Data";
import SearchBar from "./SearchBar";

export const FilterContext = createContext();

const JobListing = () => {
  const [filters, setFilters] = useState({});

  return (
    <>
      <Layout>
        <FilterContext.Provider value={{ filters, setFilters }}>
          <Header>
            <SearchBar />
          </Header>
          <ListingData />
        </FilterContext.Provider>
      </Layout>
    </>
  );
};

export default JobListing;
