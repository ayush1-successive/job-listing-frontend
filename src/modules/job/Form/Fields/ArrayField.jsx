import React from "react";
import PropTypes from "prop-types";
import { Button, Col, FormItem, FormList, Input } from "../../../../components";
import {
  MinusCircleOutlined,
  PlusOutlined,
} from "../../../../components/Icons";
import "../form.css";

const ArrayField = (props) => {
  const { name, label, text } = props;

  return (
    <Col lg={12} md={8} xs={24}>
      <FormItem name={name} label={label}>
        <FormList name={name}>
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, index) => (
                  <div key={field.key}>
                    <FormItem name={[index]} rules={[{ required: true }]}>
                      <div className="form-item-container">
                        <Input className="form-subitem" />
                        <MinusCircleOutlined
                          className="form-subitem-icon"
                          onClick={() => remove(field.name)}
                        />
                      </div>
                    </FormItem>
                  </div>
                ))}

                <Button
                  type="dashed"
                  block
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  {text}
                </Button>
              </>
            );
          }}
        </FormList>
      </FormItem>
    </Col>
  );
};

ArrayField.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ArrayField;
