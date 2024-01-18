import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, message, theme } from "antd";
import axios from "axios";
import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getFormStyle } from "../styles/formStyle";
import { AuthenticationContext } from "./Context";
import FormHeader from "./Header";

const { useToken } = theme;
const { Text, Link } = Typography;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Register = () => {
  const { token } = useToken();
  const styles = getFormStyle(token);

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { isAuth } = useContext(AuthenticationContext);

  const displaySuccessMessage = (message) => {
    messageApi.open({
      type: "success",
      content: message,
      duration: 1,
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
      duration: 4,
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
      await axios.request(options);
      displaySuccessMessage(
        "User successfully registered. Redirecting to login page.."
      );

      await delay(1000);
      navigate("/login");
    } catch (error) {
      console.log(error);
      displayErrorMessage(error.response.data);
    }
  };

  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

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
