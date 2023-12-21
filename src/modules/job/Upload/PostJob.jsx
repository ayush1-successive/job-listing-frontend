import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";

import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React from "react";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const PostJob = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);

    const options = {
      method: "POST",
      url: "http://localhost:8080/jobs/create",
      data: values,
    };

    try {
      const response = await axios.request(options);
      console.log("Request fetched!");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="post-job"
      onFinish={onFinish}
      style={{ maxWidth: "80%" }}
      scrollToFirstError
    >
      <Divider orientation="left" orientationMargin={20}>
        <Typography.Title level={5}>Job Details</Typography.Title>
      </Divider>

      <Row gutter={24}>
        <Col lg={12} md={8} xs={24}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please enter the street",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Job Title..." />
          </Form.Item>
        </Col>
        <Col lg={12} md={8} xs={24}>
          <Form.Item
            name="company"
            label="Company"
            rules={[
              {
                required: true,
                message: "Please input company name!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Company Name..." />
          </Form.Item>
        </Col>
        <Col lg={12} md={8} xs={24}>
          <Form.Item
            name="jobType"
            label="Job Type"
            rules={[
              {
                required: true,
                message: "Select job type",
              },
            ]}
          >
            <Select placeholder="Select job type">
              <Select.Option value="Full-time" />
              <Select.Option value="Part-time" />
              <Select.Option value="Internship" />
            </Select>
          </Form.Item>
        </Col>
        <Col lg={12} md={8} xs={24}>
          <Form.Item
            name="industry"
            label="Industry"
            rules={[
              {
                required: true,
                message: "Please enter the industry",
              },
            ]}
          >
            <Input placeholder="Industry..." />
          </Form.Item>
        </Col>
        <Col lg={20} md={8} xs={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please enter the job description",
              },
            ]}
          >
            <TextArea placeholder="Enter job description..." />
          </Form.Item>
        </Col>
        <Col lg={20} md={8} xs={24}>
          <Form.Item name="responsibilities" label="Responsibilities">
            <Form.List name="responsibilities">
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.key} style={{ display: "flex" }}>
                        <Form.Item
                          name={[index]}
                          rules={[{ required: true }]}
                          style={{ width: "100%" }}
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

                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "30%" }}
                    >
                      <PlusOutlined /> Add responsibility
                    </Button>
                  </>
                );
              }}
            </Form.List>
          </Form.Item>
        </Col>
        <Col lg={20} md={8} xs={24}>
          <Form.Item name="requirements" label="Requirements">
            <Form.List name="requirements">
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.key} style={{ display: "flex" }}>
                        <Form.Item
                          name={[index]}
                          rules={[{ required: true }]}
                          style={{ width: "100%" }}
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

                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "30%" }}
                    >
                      <PlusOutlined /> Add requirement
                    </Button>
                  </>
                );
              }}
            </Form.List>
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" orientationMargin={20}>
        <Typography.Title level={5}>Office Address</Typography.Title>
      </Divider>

      <Row gutter={10}>
        <Col lg={8} md={8} xs={24}>
          <Form.Item
            name={["address", "street"]}
            label="Street"
            rules={[
              {
                required: true,
                message: "Please enter the street",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={8} md={8} xs={24}>
          <Form.Item
            name={["address", "city"]}
            label="City"
            rules={[
              {
                required: true,
                message: "Please enter the city",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={8} md={8} xs={24}>
          <Form.Item
            name={["address", "state"]}
            label="State"
            rules={[
              {
                required: true,
                message: "Please enter the state",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={11} md={8} xs={24}>
          <Form.Item
            name={["address", "country"]}
            label="Country"
            rules={[
              {
                required: true,
                message: "Please enter the country",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={11} md={8} xs={24}>
          <Form.Item name={["address", "postalCode"]} label="Postal Code">
            <InputNumber style={{ width: "50%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" orientationMargin={20}>
        <Typography.Title level={5}>Qualifications</Typography.Title>
      </Divider>

      <Row gutter={24}>
        <Col lg={12} md={8} xs={24}>
          <Form.Item
            name={["qualifications", "education"]}
            label="Education"
            rules={[
              {
                required: true,
                message: "Please enter the education qualification",
              },
            ]}
          >
            <Input placeholder="Education qualification..." />
          </Form.Item>
        </Col>
        <Col lg={12} md={8} xs={24}>
          <Form.Item
            name={["qualifications", "skills"]}
            label="Skills"
            rules={[
              {
                required: true,
                message: "Please enter the required skills",
              },
            ]}
          >
            <Input placeholder="Required skills..." />
          </Form.Item>
        </Col>
        <Col lg={12} md={8} xs={24}>
          <Form.Item
            name={["qualifications", "minExperience"]}
            label="Min Experience"
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Min experience needed(years)..."
            />
          </Form.Item>
        </Col>
        <Col lg={12} md={8} xs={24}>
          <Form.Item
            name={["qualifications", "maxExperience"]}
            label="Max Experience"
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Max experience needed(years)..."
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" orientationMargin={20}>
        <Typography.Title level={5}>Salary</Typography.Title>
      </Divider>

      <Row gutter={10}>
        <Col lg={8} md={8} xs={24}>
          <Form.Item name={["salary", "amount"]} label="Amount">
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Salary amount..."
            />
          </Form.Item>
        </Col>

        <Col lg={8} md={8} xs={24}>
          <Form.Item name={["salary", "currency"]} label="Currency">
            <Select placeholder="Currency...">
              <Select.Option value="rupees">Rupees</Select.Option>
              <Select.Option value="dollars">Dollars</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col lg={8} md={8} xs={24}>
          <Form.Item name={["salary", "periodicity"]} label="Periodicity">
            <Select placeholder="Salary Periodicity...">
              <Select.Option value="hourly">Hourly</Select.Option>
              <Select.Option value="daily">Daily</Select.Option>
              <Select.Option value="monthly">Monthly</Select.Option>
              <Select.Option value="annually">Annually</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" orientationMargin={20}>
        <Typography.Title level={5}>Additional Information</Typography.Title>
      </Divider>

      <Row gutter={24}>
        <Col lg={12} md={8} xs={24}>
          <Form.Item
            name="applicationDeadline"
            label="Application Deadline"
            rules={[
              {
                required: true,
                message: "Please select the application deadline",
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              showTime
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Col>

        <Col lg={12} md={8} xs={24}>
          <Form.Item
            name="isRemote"
            label="Is Remote"
            rules={[
              {
                required: true,
                message: "Please select if the job is remote",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col lg={12} md={8} xs={24}>
          <Form.Item
            name="contactEmail"
            label="Contact Email"
            rules={[
              {
                required: true,
                message: "Please enter the contact email",
              },
            ]}
          >
            <Input type="email" placeholder="Contact email..." />
          </Form.Item>
        </Col>

        <Col lg={12} md={8} xs={24}>
          <Form.Item
            name="applicationLink"
            label="Application Link"
            rules={[
              {
                required: true,
                message: "Please enter the application link",
              },
            ]}
          >
            <Input placeholder="Application link..." />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

// TODO: Validation in forms
// minExperience, maxExperience

// TODO: Fix console errors

export default PostJob;
