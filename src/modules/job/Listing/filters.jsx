import { Menu, Select, Space } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import locations from "./filters/locations";
import jobTypes from "./filters/jobTypes";
import industry from "./filters/industry";

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

const locationOptions = Object.values(locations).map((location) => ({
  label: `${location.city}, ${location.state}`,
  value: `${location.city}, ${location.state}`,
  desc: `${location.city}, ${location.state}`,
}));

const JobFilters = () => {
  return (
    <Menu mode="inline">
      <div style={{ textAlign: "center" }}>
        <Select
          mode="multiple"
          style={{
            width: "100%",
            display: "inline-block",
          }}
          placeholder="Select Job Type"
          // onChange={handleChange}
          optionLabelProp="label"
          options={jobTypeOptions}
          optionRender={(option) => <Space>{option.data.desc}</Space>}
        />
      </div>

      <div style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
        <Select
          mode="multiple"
          style={{
            width: "100%",
            display: "inline-block",
          }}
          placeholder="Select Industry"
          // onChange={handleChange}
          optionLabelProp="label"
          options={industryOptions}
          optionRender={(option) => <Space>{option.data.desc}</Space>}
        />
      </div>
      <div style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
        <Select
          mode="multiple"
          style={{
            width: "100%",
            display: "inline-block",
          }}
          placeholder="Select Location"
          // onChange={handleChange}
          optionLabelProp="label"
          options={locationOptions}
          optionRender={(option) => <Space>{option.data.desc}</Space>}
        />
      </div>
    </Menu>
  );
};

export default JobFilters;
