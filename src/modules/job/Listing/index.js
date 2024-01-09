import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import ListingData from "./Data";
import SearchBar from "./SearchBar";

const JobListing = () => {
  return (
    <>
      <Layout>
        <Header>
          <SearchBar />
        </Header>
        <ListingData />
      </Layout>
    </>
  );
};

export default JobListing;
