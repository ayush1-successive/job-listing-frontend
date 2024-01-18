import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
import React, { useEffect } from "react";

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

const JobForm = (props) => {
  const { jobListing, submitMessage, formHeading, requestMethod, requestApi } =
    props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(jobListing);
  }, [form, jobListing]);

  const onFinish = async (values) => {
    console.log(values);

    const options = {
      method: requestMethod,
      url: requestApi,
      data: values,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name={formHeading}
      onFinish={onFinish}
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
                message: "Please enter the job title",
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
      </Row>
      <Row gutter={24}>
        <Col lg={12} md={8} xs={24}>
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

        <Col lg={12} md={8} xs={24}>
          <Form.Item name={["salary"]} label="Salary">
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Salary amount..."
              prefix="₹"
              suffix="annually"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col lg={12} md={8} xs={24}>
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
                      block
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add responsibility
                    </Button>
                  </>
                );
              }}
            </Form.List>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col lg={12} md={8} xs={24}>
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
                      block
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add requirement
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
        <Col lg={12} md={8} xs={24}>
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
        <Col lg={12} md={8} xs={24}>
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
            <DatePicker style={{ width: "100%" }} />
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
          {submitMessage}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default JobForm;
