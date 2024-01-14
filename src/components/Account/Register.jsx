import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Grid, Input, Typography, message, theme } from "antd";
import axios from "axios";
import React from "react";
import FormHeader from "./Header";
import { useNavigate } from "react-router-dom";
import { getFormStyle } from "../styles/formStyle";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Link } = Typography;

const Register = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const styles = getFormStyle(screens, token);

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const displaySuccessMessage = (data) => {
    messageApi.open({
      type: "success",
      content: data.message,
    });
  };

  const displayErrorMessage = (data) => {
    if (data?.error?.details) {
      data.error.details.forEach((error) =>
        messageApi.open({
          type: "error",
          content: error.message,
          duration: 10,
        })
      );
      return;
    }

    messageApi.open({
      type: "error",
      content: data.message,
    });
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    const options = {
      method: "POST",
      url: "http://localhost:8080/users/register",
      data: values,
    };

    delete options.data.confirmPassword;

    try {
      const response = await axios.request(options);

      displaySuccessMessage(response.data);
      navigate("/dashboard");
    } catch (error) {
      displayErrorMessage(error.response.data);
    }
  };

  return (
    <>
      {contextHolder}
      <section style={styles.section}>
        <div style={styles.container}>
          <FormHeader
            styles={styles}
            headerTitle="Sign Up"
            headerText="Welcome to JobNest! Please enter your details to get started."
          />
          <Form
            aria-label="register-form"
            name="register"
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
              hasFeedback
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
              hasFeedback
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block="true" type="primary" htmlType="submit">
                Sign Up
              </Button>
              <div style={styles.footer}>
                <Text style={styles.text}>Already have an account?</Text>{" "}
                <Link href="/login">Sign in</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Register;
