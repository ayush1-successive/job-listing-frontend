import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Grid, Input, Typography, message, theme } from "antd";
import axios from "axios";
import React from "react";
import FormHeader from "./header";
import { getFormStyle } from "./styles";
import { useNavigate } from "react-router-dom";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Link } = Typography;

const Login = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const styles = getFormStyle(screens, token);

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const displayMessage = (messageType, data) => {
    messageApi.open({
      type: messageType,
      content: data?.message,
    });
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    const options = {
      method: "POST",
      url: "http://localhost:8080/users/login",
      data: values,
    };

    try {
      const response = await axios.request(options);
      displayMessage("success", response?.data);

      navigate("/dashboard");
    } catch (error) {
      displayMessage("error", error.response?.data);
    }
  };

  return (
    <>
      {contextHolder}
      <section style={styles.section}>
        <div style={styles.container}>
          <FormHeader
            styles={styles}
            headerTitle="Sign in"
            headerText="Welcome back to JobNest UI! Please enter your details below to sign
            in."
          />
          <Form
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

            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block="true" type="primary" htmlType="submit">
                Log in
              </Button>
              <div style={styles.footer}>
                <Text style={styles.text}>Don't have an account?</Text>{" "}
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
