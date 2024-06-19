"use client";

import React, { FC, useState } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  DatePicker,
  Tooltip,
  Button,
  Select,
  Modal,
} from "antd";
import { modalStyles } from "./styles";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useEmployeeState } from "./../../Provider/Employee";
import { IEmployee } from "@/src/Provider/Employee/interface";

interface AddEmployeeModalProps {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: IEmployee) => void;
  form: any;
}

enum SeniorityRating {
  Junior = 1,
  Intermediate = 2,
  Senior = 3,
}

enum YearsOfExperience {
  LessThanOneYear = 1,
  OneToThreeYears = 2,
  ThreeToFiveYears = 3,
  FiveToTenYears = 4,
  MoreThanTenYears = 5,
}

type FormValues = {
  employee: {
    firstName: string;
    lastName: string;
    contactNumber: string;
    emailAddress: string;
    dateOfBirth: string;
  };
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  skills: {
    name: string;
    yearsOfExperience: number;
    seniorityRating: number;
  }[];
};

const mapYearsOfExperience = (value: string): YearsOfExperience => {
  switch (value) {
    case "LessThanOneYear":
      return YearsOfExperience.LessThanOneYear;
    case "OneToThreeYears":
      return YearsOfExperience.OneToThreeYears;
    case "ThreeToFiveYears":
      return YearsOfExperience.ThreeToFiveYears;
    case "FiveToTenYears":
      return YearsOfExperience.FiveToTenYears;
    case "MoreThanTenYears":
      return YearsOfExperience.MoreThanTenYears;
    default:
      return YearsOfExperience.LessThanOneYear;
  }
};

const mapSeniorityRating = (value: string): SeniorityRating => {
  switch (value) {
    case "Junior":
      return SeniorityRating.Junior;
    case "Intermediate":
      return SeniorityRating.Intermediate;
    case "Senior":
      return SeniorityRating.Senior;
    default:
      return SeniorityRating.Junior;
  }
};

const AddEmployeeModal: FC<AddEmployeeModalProps> = ({
  visible,
  onCancel,
  onFinish,
  form,
}) => {
  const { employee } = useEmployeeState();
  const [skills, setSkills] = useState([
    { name: "", yearsOfExperience: "", seniorityRating: "" },
  ]);
  const { styles } = modalStyles();

  const handleAddSkill = () => {
    setSkills([
      ...skills,
      { name: "", yearsOfExperience: "", seniorityRating: "" },
    ]);
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const handleSkillChange = (
    index: number,
    field: keyof (typeof skills)[0],
    value: any
  ) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;
    setSkills(newSkills);
  };

  const handleFinish = (values: any) => {
    const mappedValues: FormValues = {
      employee: {
        ...values,
        dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
      },
      address: {
        street: values.street,
        city: values.city,
        zipCode: values.zipCode,
        country: values.country,
      },
      skills: skills.map((skill) => ({
        name: skill.name,
        yearsOfExperience: mapYearsOfExperience(skill.yearsOfExperience),
        seniorityRating: mapSeniorityRating(skill.seniorityRating),
      })),
    };
    onFinish(mappedValues);
  };

  return (
    <Modal
      className={styles.modal}
      visible={visible}
      onCancel={() => {
        onCancel();
        form.resetFields();
        setSkills([{ name: "", yearsOfExperience: "", seniorityRating: "" }]);
      }}
      okText="Add Employee"
      onOk={() => form.submit()}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={(values) => handleFinish(values)}
        name="new-employee"
      >
        <div>
          <h3>Basic Info</h3>
        </div>
        <Row className={styles.row}>
          <Col span={8} className={styles.col}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please input your First name!",
                },
              ]}
              className={styles.formItemLabel}
            >
              <Input className={styles.input} />
            </Form.Item>
          </Col>
          <Col span={16} className={styles.col}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please input your last name!",
                },
              ]}
              className={styles.formItemLabel}
            >
              <Input className={styles.input} />
            </Form.Item>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={24} className={styles.col}>
            <Form.Item
              name="contactNumber"
              label="Contact Number"
              rules={[
                {
                  required: true,
                  message: "Please input your contact number!",
                },
              ]}
              className={styles.formItemLabel}
            >
              <Input className={styles.input} />
            </Form.Item>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={24} className={styles.col}>
            <Form.Item
              name="emailAddress"
              label="Email Address"
              rules={[
                {
                  required: true,
                  message: "Please input your email address!",
                },
              ]}
              className={styles.formItemLabel}
            >
              <Input className={styles.input} />
            </Form.Item>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={8} className={styles.col}>
            <Form.Item
              name="dateOfBirth"
              label="Date Of Birth"
              rules={[
                {
                  required: true,
                  message: "Please input your date of Birth!",
                },
              ]}
              className={styles.formItemLabel}
            >
              <DatePicker className={styles.input} />
            </Form.Item>
          </Col>
        </Row>
        <div>
          <h3>Address Info</h3>
        </div>
        <Row className={styles.row}>
          <Col span={24} className={styles.col}>
            <Form.Item
              name="street"
              label="Street Address"
              rules={[
                {
                  required: true,
                  message: "Please input your street address!",
                },
              ]}
              className={styles.formItemLabel}
            >
              <Input className={styles.input} />
            </Form.Item>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={8} className={styles.col}>
            <Form.Item
              name="city"
              label="City"
              rules={[
                {
                  required: true,
                  message: "Please input your city!",
                },
              ]}
              className={styles.formItemLabel}
            >
              <Input className={styles.input} />
            </Form.Item>
          </Col>
          <Col span={8} className={styles.col}>
            <Form.Item
              name="zipCode"
              label="Zip Code"
              rules={[
                {
                  required: true,
                  message: "Please input your Zip Code!",
                },
              ]}
              className={styles.formItemLabel}
            >
              <Input className={styles.input} />
            </Form.Item>
          </Col>
          <Col span={8} className={styles.col}>
            <Form.Item
              name="country"
              label="Country"
              rules={[
                {
                  required: true,
                  message: "Please input your country!",
                },
              ]}
              className={styles.formItemLabel}
            >
              <Input className={styles.input} />
            </Form.Item>
          </Col>
        </Row>
        <div>
          <h3 className={styles.sectionTitle}>Skills</h3>
        </div>
        {skills.map((skill, index) => (
          <Row className="ant-row" key={index}>
            <Col span={8} className="ant-col">
              <Form.Item
                label="Skill"
                rules={[
                  {
                    required: true,
                    message: "Please input your skill!",
                  },
                ]}
                className={styles.formItemLabel}
              >
                <Input
                  className={styles.input}
                  value={skill.name}
                  onChange={(e) =>
                    handleSkillChange(index, "name", e.target.value)
                  }
                />
              </Form.Item>
            </Col>
            <Col span={8} className={styles.col}>
              <Form.Item
                name={`yearsOfExperience-${index}`}
                label="Yrs Exp"
                rules={[
                  {
                    required: true,
                    message: "Please select years of experience!",
                  },
                ]}
                className={styles.formItemLabel}
              >
                <Select
                  value={skill.yearsOfExperience}
                  className={styles.input}
                  onChange={(value) =>
                    handleSkillChange(index, "yearsOfExperience", value)
                  }
                >
                  <Select.Option value={YearsOfExperience.LessThanOneYear}>
                    Less than One Year
                  </Select.Option>
                  <Select.Option value={YearsOfExperience.OneToThreeYears}>
                    One to Three Years
                  </Select.Option>
                  <Select.Option value={YearsOfExperience.ThreeToFiveYears}>
                    Three to Five Years
                  </Select.Option>
                  <Select.Option value={YearsOfExperience.FiveToTenYears}>
                    Five to Ten Years
                  </Select.Option>
                  <Select.Option value={YearsOfExperience.MoreThanTenYears}>
                    More than Ten Years
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} className={styles.col}>
              <Form.Item
                name={`seniorityRating-${index}`}
                label="Seniority"
                rules={[
                  {
                    required: true,
                    message: "Please select seniority rating!",
                  },
                ]}
                className={styles.formItemLabel}
              >
                <Select
                  //className={styles.antSelect}
                  value={skill.seniorityRating}
                  className={styles.input}
                  onChange={(value) =>
                    handleSkillChange(index, "seniorityRating", value)
                  }
                >
                  <Select.Option value={SeniorityRating.Junior}>
                    Junior
                  </Select.Option>
                  <Select.Option value={SeniorityRating.Intermediate}>
                    Intermediate
                  </Select.Option>
                  <Select.Option value={SeniorityRating.Senior}>
                    Senior
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={2} className={styles.col}>
              <Tooltip title="delete">
                <Button
                  aria-label=""
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveSkill(index)}
                  className={styles.primaryButton}
                />
              </Tooltip>
            </Col>
          </Row>
        ))}
        <Row className={styles.row}>
          <Col span={24} className={styles.col}>
            <Button
              name="addNewSkill"
              onClick={handleAddSkill}
              className={styles.addNewSkillButton}
            >
              <PlusOutlined />
              Add new skill
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddEmployeeModal;
