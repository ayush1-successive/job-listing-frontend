import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, message } from "antd";
import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import apiInstance from "../../services/api";
import { AuthenticationContext } from "./Context";
import FormHeader from "./Header";

const { Text, Link } = Typography;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Login = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { isAuth } = useContext(AuthenticationContext);

  const displayMessage = (messageType, data) => {
    messageApi.open({
      type: messageType,
      content: data?.message,
      duration: 1,
    });
  };

  const onFinish = async (values) => {
    try {
      const response = await apiInstance.post("/users/login", values);

      displayMessage("success", {
        message: "Login successful. Redirecting to Dashboard page..",
      });

      localStorage.setItem("token", response.data.data.token);
      await delay(1000);

      window.location.reload();
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      displayMessage("error", error.response?.data);
    }
  };

  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      {contextHolder}
      <section className="form-section">
        <div className="form-container">
          <FormHeader
            headerTitle="Sign in"
            headerText="Welcome back to JobNest UI! Please enter your details below to sign
            in."
          />
          <Form
            aria-label="login-form"
            name="login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
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

            <Form.Item>
              <Button block="true" type="primary" htmlType="submit">
                Log in
              </Button>
              <div className="form-footer">
                <Text className="form-text">Don't have an account?</Text>{" "}
                <Link href="/register">Sign up now</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Login;
