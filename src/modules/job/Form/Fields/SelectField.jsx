import React from "react";
import PropTypes from "prop-types";
import { Col, FormItem, Select } from "../../../../components";

const SelectField = (props) => {
  const { lg, name, label, options } = props;

  const selectOptions = options.map((value) => ({
    label: value,
    value,
    desc: value,
  }));

  return (
    <Col lg={lg} md={8} xs={24}>
      <FormItem
        name={name}
        label={label}
        rules={[
          {
            required: true,
            message: `Please Select ${label}`,
          },
        ]}
      >
        <Select
          options={selectOptions}
          dropdownStyle={{ textAlign: "center" }}
          placeholder={`${label}...`}
        />
      </FormItem>
    </Col>
  );
};

SelectField.propTypes = {
  lg: PropTypes.number.isRequired,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectField;
