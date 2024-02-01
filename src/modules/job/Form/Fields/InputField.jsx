import React from "react";
import PropTypes from "prop-types";
import { Col, FormItem, Input } from "../../../../components";

const InputField = (props) => {
  const { name, label } = props;

  return (
    <Col lg={12} md={8} xs={24}>
      <FormItem
        name={name}
        label={label}
        rules={[
          {
            required: true,
            message: `Please enter ${label}`,
          },
        ]}
      >
        <Input placeholder={`${label}...`} />
      </FormItem>
    </Col>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default InputField;
