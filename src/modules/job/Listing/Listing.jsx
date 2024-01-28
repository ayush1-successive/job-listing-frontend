import { Layout, theme } from "antd";
import React, { useMemo, useState } from "react";
import { ListingContext } from "./Context";
import JobFilters from "./Filters";
import ItemsData from "./Items";
import SearchBar from "./SearchBar";

const { Content, Sider } = Layout;

const Listing = () => {
  const [toFetch, setToFetch] = useState(true);
  const [filters, setFilters] = useState({ salary: [2, 50] });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const contextValue = useMemo(
    () => ({
      toFetch,
      setToFetch,
      filters,
      setFilters,
      currentPage,
      setCurrentPage,
      itemsPerPage,
      setItemsPerPage,
    }),
    [
      toFetch,
      setToFetch,
      filters,
      setFilters,
      currentPage,
      setCurrentPage,
      itemsPerPage,
      setItemsPerPage,
    ]
  );

  return (
    <Content style={{ padding: 12 }}>
      <ListingContext.Provider value={contextValue}>
        <SearchBar />

        <Layout style={{ marginTop: 15 }}>
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
