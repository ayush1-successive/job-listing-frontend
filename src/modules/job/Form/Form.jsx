import { Form } from "antd";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  FormItem,
  FormList,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  Row,
  Select,
  SelectOption,
  TextArea,
  Title,
} from "../../../components";
import { MinusCircleOutlined, PlusOutlined } from "../../../components/Icons";
import apiInstance from "../../../services/api";
import "./form.css";

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
  const {
    jobListing,
    submitMessage,
    formHeading,
    requestMethod,
    requestApi,
    uploadSuccess,
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(jobListing);
  }, [form, jobListing]);

  const onFinish = async (values) => {
    const options = {
      method: requestMethod,
      url: requestApi,
      data: values,
    };

    try {
      await apiInstance.request(options);

      uploadSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      aria-label={`${formHeading}-form`}
      name={formHeading}
      onFinish={onFinish}
      scrollToFirstError
    >
      <Divider orientation="left" orientationMargin={20}>
        <Title level={5}>Job Details</Title>
      </Divider>

      <Row gutter={24}>
        <Col lg={12} md={8} xs={24}>
          <FormItem
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
          </FormItem>
        </Col>
        <Col lg={12} md={8} xs={24}>
          <FormItem
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
          </FormItem>
        </Col>
        <Col lg={12} md={8} xs={24}>
          <FormItem
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
              <SelectOption value="Full-time" />
              <SelectOption value="Part-time" />
              <SelectOption value="Internship" />
            </Select>
          </FormItem>
        </Col>
        <Col lg={12} md={8} xs={24}>
          <FormItem
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
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col lg={12} md={8} xs={24}>
          <FormItem name="description" label="Description">
            <TextArea placeholder="Enter job description..." />
          </FormItem>
        </Col>

        <Col lg={12} md={8} xs={24}>
          <FormItem name={["salary"]} label="Salary">
            <InputNumber
              className="form-InputNumber"
              placeholder="Salary amount..."
              prefix="₹"
              suffix="annually"
            />
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col lg={12} md={8} xs={24}>
          <FormItem name="responsibilities" label="Responsibilities">
            <FormList name="responsibilities">
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.key} className="form-ListItem">
                        <FormItem
                          name={[index]}
                          rules={[{ required: true }]}
                          className="form-InputNumber"
                        >
                          <Input />
                        </FormItem>

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
            </FormList>
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col lg={12} md={8} xs={24}>
          <FormItem name="requirements" label="Requirements">
            <Form.List name="requirements">
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.key} className="form-ListItem">
                        <FormItem
                          name={[index]}
                          rules={[{ required: true }]}
                          className="form-InputNumber"
                        >
                          <Input />
                        </FormItem>

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
          </FormItem>
        </Col>
      </Row>

      <Divider orientation="left" orientationMargin={20}>
        <Title level={5}>Office Address</Title>
      </Divider>

      <Row gutter={10}>
        <Col lg={12} md={8} xs={24}>
          <FormItem name={["address", "city"]} label="City">
            <Input />
          </FormItem>
        </Col>
        <Col lg={12} md={8} xs={24}>
          <FormItem name={["address", "state"]} label="State">
            <Input />
          </FormItem>
        </Col>
      </Row>

      <Divider orientation="left" orientationMargin={20}>
        <Title level={5}>Qualifications</Title>
      </Divider>

      <Row gutter={24}>
        <Col lg={12} md={8} xs={24}>
          <FormItem
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
          </FormItem>
        </Col>
        <Col lg={12} md={8} xs={24}>
          <FormItem
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
          </FormItem>
        </Col>
        <Col lg={12} md={8} xs={24}>
          <FormItem
            name={["qualifications", "minExperience"]}
            label="Min Experience"
          >
            <InputNumber
              className="form-InputNumber"
              placeholder="Min experience needed(years)..."
            />
          </FormItem>
        </Col>
        <Col lg={12} md={8} xs={24}>
          <FormItem
            name={["qualifications", "maxExperience"]}
            label="Max Experience"
          >
            <InputNumber
              className="form-InputNumber"
              placeholder="Max experience needed(years)..."
            />
          </FormItem>
        </Col>
      </Row>

      <Divider orientation="left" orientationMargin={20}>
        <Title level={5}>Additional Information</Title>
      </Divider>

      <Row gutter={24}>
        <Col lg={12} md={8} xs={24}>
          <FormItem
            name="applicationDeadline"
            label="Application Deadline"
            rules={[
              {
                required: true,
                message: "Please select the application deadline",
              },
            ]}
          >
            <DatePicker className="form-InputNumber" />
          </FormItem>
        </Col>

        <Col lg={12} md={8} xs={24}>
          <FormItem
            name="isRemote"
            label="Is Remote"
            rules={[
              {
                required: true,
                message: "Please select if the job is remote",
              },
            ]}
          >
            <RadioGroup>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </RadioGroup>
          </FormItem>
        </Col>

        <Col lg={12} md={8} xs={24}>
          <FormItem
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
          </FormItem>
        </Col>

        <Col lg={12} md={8} xs={24}>
          <FormItem
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
          </FormItem>
        </Col>
      </Row>

      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          {submitMessage}
        </Button>
      </FormItem>
    </Form>
  );
};

JobForm.propTypes = {
  jobListing: PropTypes.object,
  submitMessage: PropTypes.string.isRequired,
  formHeading: PropTypes.string.isRequired,
  requestMethod: PropTypes.string.isRequired,
  requestApi: PropTypes.string.isRequired,
  uploadSuccess: PropTypes.func.isRequired,
};

export default JobForm;
