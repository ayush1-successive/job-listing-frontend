import { Form } from "antd";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import {
  Button,
  Col,
  Divider,
  FormItem,
  Row,
  TextArea,
  Title,
} from "../../../components";
import apiInstance from "../../../services/api";
import {
  education,
  industry,
  jobTypes,
  locations,
} from "../Listing/filtersTypes";
import {
  ArrayField,
  CascaderField,
  DatePickerField,
  InputField,
  InputNumberField,
  RadioField,
  SelectField,
} from "./Fields";
import "./form.css";
import { formItemLayout, tailFormItemLayout } from "./styles";

const UploadForm = (props) => {
  const {
    jobListing,
    submitMessage,
    formHeading,
    requestMethod,
    requestApi,
    uploadSuccess,
    ...rest
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(jobListing);
  }, [form, jobListing]);

  const onFinish = async (values) => {
    const formData = { ...values, ...rest };

    if (formData.address) {
      formData.address = { state: values.address[0], city: values.address[1] };
    }

    const options = {
      method: requestMethod,
      url: requestApi,
      data: formData,
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
        <InputField name="title" label="Title" />
        <InputField name="company" label="Company" />
        <SelectField
          lg={12}
          name="jobType"
          label="Job Type"
          options={jobTypes}
        />
        <SelectField
          lg={12}
          name="industry"
          label="Industry"
          options={industry}
        />
      </Row>
      <Row gutter={24}>
        <Col lg={12} md={8} xs={24}>
          <FormItem name="description" label="Description">
            <TextArea placeholder="Enter job description..." />
          </FormItem>
        </Col>
        <InputNumberField
          lg={12}
          name="salary"
          label="Salary"
          placeholder="Salary amount"
          prefix="₹"
          suffix="annually"
        />
      </Row>
      <Row gutter={24}>
        <CascaderField
          lg={12}
          name="address"
          label="Office Address"
          options={locations}
        />
        <ArrayField
          name={["qualifications", "skills"]}
          label="Skills Required"
          text="Add skill"
        />
      </Row>
      <Row gutter={24}>
        <ArrayField
          name="responsibilities"
          label="Responsibilities"
          text="Add responsibility"
        />
        <ArrayField
          name="requirements"
          label="Requirements"
          text="Add requirement"
        />
      </Row>
      <Divider orientation="left" orientationMargin={20}>
        <Title level={5}>Qualifications</Title>
      </Divider>
      <Row gutter={24}>
        <SelectField
          lg={8}
          name={["qualifications", "education"]}
          label="Education"
          options={education}
        />
        <InputNumberField
          lg={8}
          name={["qualifications", "maxExperience"]}
          label="Max Experience"
          placeholder="Min experience needed(years)"
        />
        <InputNumberField
          lg={8}
          name={["qualifications", "minExperience"]}
          label="Min Experience"
          placeholder="Max experience needed(years)"
        />
      </Row>
      <Divider orientation="left" orientationMargin={20}>
        <Title level={5}>Additional Information</Title>
      </Divider>
      <Row gutter={24}>
        <DatePickerField
          name="applicationDeadline"
          label="Application Deadline"
        />
        <RadioField />
        <InputField name="contactEmail" label="Contact Email" />
        <InputField name="applicationLink" label="Application Link" />
      </Row>
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          {submitMessage}
        </Button>
      </FormItem>
    </Form>
  );
};

UploadForm.propTypes = {
  jobListing: PropTypes.object,
  submitMessage: PropTypes.string.isRequired,
  formHeading: PropTypes.string.isRequired,
  requestMethod: PropTypes.string.isRequired,
  requestApi: PropTypes.string.isRequired,
  uploadSuccess: PropTypes.func.isRequired,
};

export default UploadForm;
