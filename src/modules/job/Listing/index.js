import React from "react";
import SearchBar from "./SearchBar";
import { Header } from "antd/es/layout/layout";
import { Layout } from "antd";
import ListingData from "./Data";

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
