import { Button, Select, Slider, Typography } from "antd";
import { useContext } from "react";
import { ListingContext } from "./Context";
import { industry, jobTypes } from "./filtersTypes";

const jobTypeOptions = Object.values(jobTypes).map((value) => ({
  label: value,
  value,
  desc: value,
}));

const industryOptions = Object.values(industry).map((value) => ({
  label: value,
  value,
  desc: value,
}));

const { Title } = Typography;

const JobFilters = () => {
  const { setToFetch, filters, setFilters, setCurrentPage, setItemsPerPage } =
    useContext(ListingContext);

  const resetPage = () => {
    setCurrentPage(1);
    setItemsPerPage(5);
  };

  const applyFilters = () => {
    resetPage();
    setToFetch(true);
  };

  const clearFilters = () => {
    setFilters({ salary: [2, 50] });
    resetPage();
    setToFetch(true);
  };

  const formatter = (value) => `${value} lpa`;

  return (
    <div style={{ padding: 20 }}>
      <Title level={5}>Select Job Type</Title>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        dropdownStyle={{ textAlign: "center" }}
        placeholder="Select Job Type"
        onChange={(value) => setFilters({ ...filters, jobType: value })}
        optionLabelProp="jobType"
        options={jobTypeOptions}
        value={filters.jobType}
      />

      <Title level={5}>Select Industry</Title>
      <Select
        mode="multiple"
        style={{ width: "100%", margin: "10px 0 10px 0" }}
        dropdownStyle={{ textAlign: "center" }}
        placeholder="Select Industry"
        onChange={(value) => setFilters({ ...filters, industry: value })}
        optionLabelProp="industry"
        options={industryOptions}
        value={filters.industry}
      />

      <Title level={5}>Set salary range</Title>
      <div style={{ padding: "0 15px" }}>
        <Slider
          range
          marks={{ 2: "2 lpa", 50: "50 lpa" }}
          tooltip={{ formatter }}
          onChange={(value) => setFilters({ ...filters, salary: value })}
          min={2}
          max={50}
          value={filters.salary}
        />
      </div>

      <div style={{ textAlign: "center", margin: "60px 0 10px 0" }}>
        <Button
          onClick={applyFilters}
          type="primary"
          style={{ marginRight: 10 }}
        >
          Apply Filters
        </Button>
        <Button onClick={clearFilters}>Reset Filters</Button>
      </div>
    </div>
  );
};

export default JobFilters;
