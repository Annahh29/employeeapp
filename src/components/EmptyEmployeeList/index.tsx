"use client";

import React, { useContext, useState, useEffect } from "react";
import { Form } from "antd";
import AddEmployeeModal from "./../NewEmployee";
import styles from "./styles.module.css";
import { useEmployeeActions, useEmployeeState } from "../../Provider/Employee";
import { IEmployee } from "./../../Provider/Employee/interface";
import logo from "@/src/app/icon.jpg";
import Image from "next/image";

const EmptyEmployeeList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { employees } = useEmployeeState();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const { getEmployees, createEmployee } = useEmployeeActions();
  const [form] = Form.useForm();

  useEffect(() => {
    getEmployees();
    console.log("employees in useEffect: ", employees);
  }, []);

  const onAddFinish = async (values: IEmployee) => {
    console.log("Adding employee:", values);
    const response = await createEmployee(values);
    console.log("response:", response);
    setIsAddModalVisible(false);
    form.resetFields();
    getEmployees(); // Refresh the employee list
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const employeeList = employees || [];
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Employees</h1>
      {employeeList.length === 0 ? (
        <div className={styles.noEmployees}>
          <Image src={logo} alt="No employees" />
          <p className={styles.noEmployeesText}>There is nothing here</p>
          <p className={styles.instructionText}>
            Create a new employee by clicking the New Employee button to get
            started
          </p>
        </div>
      ) : (
        <div className={styles.employeeList}>
          {/* Render employee list here */}
        </div>
      )}
      <button className={styles.newEmployeeButton} onClick={showAddModal}>
        <span className={styles.plusIcon}>+</span> New Employee
      </button>
      <AddEmployeeModal
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onFinish={onAddFinish}
        form={form}
      />
    </div>
  );
};

export default EmptyEmployeeList;
