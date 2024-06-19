"use client";

import React, { FC, useState, useEffect } from "react";
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
import { modalStyles } from "../NewEmployee/styles";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useEmployeeState } from "./../../Provider/Employee";
import { IEmployee, ISkill } from "@/src/Provider/Employee/interface";
import moment from "moment";

interface EditEmployeeModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  onFinishUpdate: (values: IEmployee) => void;
  form: any;
  selectedEmployeeForEdit: any;
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
    id: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    emailAddress: string;
    dateOfBirth: string;
  };
  address: {
    id: string;
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  skills: {
    id: string;
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

const mapFormValuesToDto = (values: FormValues): IEmployee => {
  return {
    address: {
      id: values.address.id,
      street: values.address.street,
      city: values.address.city,
      country: values.address.country,
      zipCode: values.address.zipCode,
    },
    employee: {
      id: values.employee.id,
      firstName: values.employee.firstName,
      lastName: values.employee.lastName,
      dateOfBirth: values.employee.dateOfBirth,
      contactNumber: values.employee.contactNumber,
      emailAddress: values.employee.emailAddress,
    },
    skills: values.skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      yearsOfExperience: skill.yearsOfExperience,
      seniorityRating: skill.seniorityRating,
    })),
  };
};

const EditEmployeeModal: FC<EditEmployeeModalProps> = ({
  visible,
  onCancel,
  onFinishUpdate,
  form,
  onOk,
  selectedEmployeeForEdit,
}) => {
  const [skills, setSkills] = useState([
    { id: "", name: "", yearsOfExperience: "", seniorityRating: "" },
  ]);
  const { styles } = modalStyles();

  useEffect(() => {
    if (selectedEmployeeForEdit) {
      const transformedSkills = selectedEmployeeForEdit.skills.map(
        (skill: ISkill) => ({
          ...skill,
          yearsOfExperience: skill.yearsOfExperience,
          seniorityRating: skill.seniorityRating,
          id: skill.id,
        })
      );

      form.setFieldsValue({
        ...selectedEmployeeForEdit,
        dateOfBirth: moment(
          selectedEmployeeForEdit.employee.dateOfBirth
        ).format("YYYY-MM-DD"),
        skills: transformedSkills,
        street: selectedEmployeeForEdit.address.street,
        city: selectedEmployeeForEdit.address.city,
        zipCode: selectedEmployeeForEdit.address.zipCode,
        country: selectedEmployeeForEdit.address.country,
        firstName: selectedEmployeeForEdit.employee.firstName,
        lastName: selectedEmployeeForEdit.employee.lastName,
        contactNumber: selectedEmployeeForEdit.employee.contactNumber,
        emailAddress: selectedEmployeeForEdit.employee.emailAddress,
        id: selectedEmployeeForEdit.employee.id,
        addressId: selectedEmployeeForEdit.employee.addressId,
      });

      setSkills(transformedSkills);
    }
  }, [selectedEmployeeForEdit]);

  const handleAddSkill = () => {
    setSkills([
      ...skills,
      { id: "", name: "", yearsOfExperience: "", seniorityRating: "" },
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

  const handleFinishUpdate = (values: any) => {
    const mappedValues: IEmployee = mapFormValuesToDto({
      employee: {
        ...values,
        id: selectedEmployeeForEdit.employee.id,
      },
      address: {
        id: selectedEmployeeForEdit.address.id,
        street: values.street,
        city: values.city,
        zipCode: values.zipCode,
        country: values.country,
      },
      skills: skills.map((skill) => ({
        name: skill.name,
        yearsOfExperience: mapYearsOfExperience(skill.yearsOfExperience),
        seniorityRating: mapSeniorityRating(skill.seniorityRating),
        id: skill.id,
      })),
    });
    onFinishUpdate(mappedValues);
  };

  return (
    <Modal
      className={styles.modal}
      visible={visible}
      onCancel={() => {
        onCancel();
        setSkills([
          { id: "", name: "", yearsOfExperience: "", seniorityRating: "" },
        ]);
      }}
      okText="Save changes to employee"
      onOk={() => form.submit()}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={
          selectedEmployeeForEdit ? { ...selectedEmployeeForEdit } : undefined
        }
        onFinish={handleFinishUpdate}
        name="Edit Employee"
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
              <input type="date" className={styles.input} />
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
                  defaultValue={skill.yearsOfExperience}
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
                  defaultValue={skill.seniorityRating}
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

export default EditEmployeeModal;
