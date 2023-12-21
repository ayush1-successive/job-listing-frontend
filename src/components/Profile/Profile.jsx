import { Button, DatePicker, Form, Input, message } from "antd";
import React, { useState } from "react";

const Profile = () => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    form
      .validateFields()
      .then((values) => {
        // Check if there are any values provided
        const hasValues = Object.values(values).some((value) => !!value);

        if (hasValues) {
          // After saving, switch back to view mode
          setIsEditMode(false);

          message.success("Changes saved successfully");
        } else {
          message.warning("Please provide at least one value before saving.");
        }
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  const handleCancelClick = () => {
    // Reset form fields on cancel
    form.resetFields();

    // Switch back to view mode
    setIsEditMode(false);
  };

  return (
    <Form form={form}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input disabled={!isEditMode} />
      </Form.Item>

      <Form.Item name="email" label="E-mail">
        <Input disabled={!isEditMode} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password disabled={!isEditMode} />
      </Form.Item>

      <Form.Item label="Summary" name="summary">
        <Input.TextArea disabled={!isEditMode} />
      </Form.Item>

      <Form.Item label="Birthdate" name="birthdate">
        <DatePicker disabled={!isEditMode} />
      </Form.Item>

      {isEditMode ? (
        <>
          <Button type="primary" onClick={handleSaveClick}>
            Save
          </Button>
          <Button onClick={handleCancelClick}>Cancel</Button>
        </>
      ) : (
        <Button onClick={handleEditClick}>Edit</Button>
      )}
    </Form>
  );
};

export default Profile;
