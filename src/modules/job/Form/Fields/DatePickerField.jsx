import React from "react";
import PropTypes from "prop-types";
import { Col, DatePicker, FormItem } from "../../../../components";

const DatePickerField = (props) => {
  const { name, label } = props;

  return (
    <Col lg={12} md={8} xs={24}>
      <FormItem
        name={name}
        label={label}
        rules={[
          {
            required: true,
            message: `Please select ${label}`,
          },
        ]}
      >
        <DatePicker className="form-input-number" />
      </FormItem>
    </Col>
  );
};

DatePickerField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default DatePickerField;
