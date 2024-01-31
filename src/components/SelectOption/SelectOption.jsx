import React, { forwardRef } from "react";
import { Select } from "antd";

const SelectOption = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <Select.Option {...props} />
    </div>
  );
});

export default SelectOption;
