import { Layout, theme } from "antd";
import React, { useState } from "react";
import JobFilters from "./Filters";
import ItemsData from "./Items";
import SearchBar from "./SearchBar";
import { ListingContext } from "./Context";

const { Content, Sider } = Layout;

const Listing = () => {
  const [toFetch, setToFetch] = useState(true);
  const [filters, setFilters] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content style={{ padding: 12 }}>
      <ListingContext.Provider
        value={{
          toFetch,
          setToFetch,
          filters,
          setFilters,
          currentPage,
          setCurrentPage,
          itemsPerPage,
          setItemsPerPage,
        }}
      >
        <SearchBar />

        <Layout>
          <Sider
            style={{ background: colorBgContainer, borderRadius: 12 }}
            width={270}
          >
            <JobFilters />
          </Sider>

          <Content
            style={{
              background: colorBgContainer,
              borderRadius: 12,
              marginLeft: 20,
              marginRight: 70,
            }}
          >
            <ItemsData />
          </Content>
        </Layout>
      </ListingContext.Provider>
    </Content>
  );
};

export default Listing;
