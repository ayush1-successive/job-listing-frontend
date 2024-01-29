import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../../services/api";
import { AuthenticationContext } from "../Authentication/Context";
import "./profile.css";
import { domains, skills } from "./selectOptions";

const { Option } = Select;

const skillOptions = Object.values(skills).map((value) => ({
  label: value,
  value,
  desc: value,
}));

const domainOptions = Object.values(domains).map((value) => ({
  label: value,
  value,
  desc: value,
}));

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Profile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { authData } = useContext(AuthenticationContext);

  const displayMessage = (messageType, data) => {
    messageApi.open({
      type: messageType,
      content: data?.message,
      duration: 1,
    });
  };

  const generateUrl = () => `/users/${authData.userId}`;

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(generateUrl());
      const profileData = response.data?.data;

      if (profileData.dateOfBirth) {
        profileData.dateOfBirth = dayjs(profileData.dateOfBirth);
      }

      form.setFieldsValue(profileData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const profileData = form.getFieldsValue();

    try {
      await apiInstance.put(generateUrl(), profileData);

      await fetchData();
      setEditMode(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCancel = async () => {
    form.resetFields();

    await fetchData();
    setEditMode(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await apiInstance.delete(generateUrl());

      displayMessage("success", {
        message:
          "Account successfully deleted. Redirecting to Dashboard page..",
      });

      await delay(1000);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {contextHolder}
      <section className="profile-section">
        <div className="profile-container">
          <div className="profile-title">
            <Typography.Title style={{ fontSize: 32 }}>
              Profile Page
            </Typography.Title>
          </div>
          <div className="profile-header">
            {editMode ? (
              <>
                <Button onClick={handleSave} type="primary">
                  Save
                </Button>
                <Button style={{ marginLeft: 10 }} onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button type="primary" onClick={() => setEditMode(true)}>
                Edit
              </Button>
            )}
          </div>

          <Form
            aria-label="profile-form"
            form={form}
            layout="vertical"
            disabled={!editMode}
          >
            <Form.Item
              name="name"
              label="Your full name ?"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input disabled={true} />
            </Form.Item>

            <Form.Item name="dateOfBirth" label="Date Of Birth">
              <DatePicker />
            </Form.Item>

            <Form.Item name="gender" label="Gender">
              <Select placeholder="Select gender" allowClear>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>

            <Form.Item name="phoneNumber" label="Phone Number">
              <Input />
            </Form.Item>

            <Form.Item name="summary" label="Summary">
              <Input.TextArea rows={6} />
            </Form.Item>

            <Form.Item name="skills" label="Skills" rules={[{ type: "array" }]}>
              <Select
                mode="multiple"
                placeholder="Please select skills"
                options={skillOptions}
              />
            </Form.Item>

            <Form.Item
              name="domains"
              label="Which domain are you interested in working?"
              rules={[{ type: "array" }]}
            >
              <Select
                mode="multiple"
                placeholder="Type Domain"
                options={domainOptions}
              />
            </Form.Item>

            <Form.Item name="achievements" label="Add Achievements">
              <Form.List name="achievements">
                {(fields, { add, remove }) => {
                  return (
                    <>
                      {fields.map((field, index) => (
                        <div key={field.key} style={{ display: "flex" }}>
                          <Form.Item
                            name={[index]}
                            rules={[{ required: true }]}
                            style={{ width: "95%" }}
                          >
                            <Input />
                          </Form.Item>

                          <Button
                            type="danger"
                            onClick={() => remove(field.name)}
                            icon={<MinusCircleOutlined />}
                          />
                        </div>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add achievement
                        </Button>
                      </Form.Item>
                    </>
                  );
                }}
              </Form.List>
            </Form.Item>
          </Form>

          <Divider orientation="left" orientationMargin={20}>
            <Typography.Title level={5}>Delete Account</Typography.Title>
          </Divider>
          <Typography.Text style={{ display: "block" }}>
            Are you sure you want to delete your account? This action is
            irreversible and will permanently delete all your data associated
            with this account.
          </Typography.Text>
          <Button
            type="primary"
            danger
            style={{ marginTop: 15 }}
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </section>
    </>
  );
};

export default Profile;
