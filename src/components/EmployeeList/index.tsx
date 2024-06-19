"use client";

import React, { useContext, useState, useEffect } from "react";
import { Form, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddEmployeeModal from "./../NewEmployee";
import styles from "../EmployeeList/styles.module.css";
import { useEmployeeActions, useEmployeeState } from "../../Provider/Employee";
import { IEmployee, IEmployeeInput } from "./../../Provider/Employee/interface";
import EmptyEmployeeList from "../EmptyEmployeeList";
import DeleteBookModal from "../DeleteEmployee";
import EditEmployeeModal from "../EditEmployee";

const EmployeeList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { employees } = useEmployeeState(); // Remove array destructuring
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteBookstate, setDeleteBookstate] = useState<IEmployee | null>(
    null
  );
  const [filteredEmployees, setFilteredBooks] = useState<IEmployee[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedEmployeeForEdit, setSelectedEmployeeForEdit] =
    useState<IEmployee | null>(null);
  const showDeleteModal = (employee: IEmployee) => {
    setDeleteBookstate(employee);
    setIsDeleteModalVisible(true);
  };

  const {
    deleteEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    createEmployee,
  } = useEmployeeActions();
  const [form] = Form.useForm();

  const handleEdit = async (employee: IEmployee) => {
    console.log("heyyyyyyyy", employee);
    setSelectedEmployeeForEdit(employee);
    console.log("selectedBookForEdit:", selectedEmployeeForEdit);
    setIsEditModalVisible(true);
  };

  useEffect(() => {
    getEmployees();
    console.log("employees in useEffect: ", employees);
  }, []);

  const onAddFinish = async (values: IEmployee) => {
    console.log("Adding category:", values);
    const response = await createEmployee(values);
    console.log("response:", response);
    setIsAddModalVisible(false);
    form.resetFields();
    getEmployees(); // Refresh the employee list
  };

  const onFinishUpdate = async (values: IEmployee) => {
    console.log("updating employee:", values);
    const response = await updateEmployee(values);
    console.log("response:", response);
    setIsEditModalVisible(false);
    form.resetFields();
    getEmployees(); // Refresh the employee list
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
    //form.setFieldsValue({ categoryID: undefined }); // Reset category field value in the form
  };

  const handleDelete = async (employee: IEmployee) => {
    console.log("book in delete:", employee);
    const response = await deleteEmployee(employee?.employee?.id as string);
    setIsDeleteModalVisible(false);
    // window.location.reload();
    //console.log('response:', response);
    getEmployees();
  };

  useEffect(() => {
    if (employees) setFilteredBooks(employees);
  }, [employees]);

  const handleSearch = (value: string) => {
    setSearchValue(value);

    // Ensure employees is defined and not empty before filtering
    if (employees && Array.isArray(employees) && employees.length > 0) {
      const filtered = employees.filter((employee) => {
        const firstName = employee.employee?.firstName?.toLowerCase() || "";
        const lastName = employee.employee?.lastName?.toLowerCase() || "";
        const emailAddress =
          employee.employee?.emailAddress?.toLowerCase() || "";

        return (
          firstName.includes(value.toLowerCase()) ||
          lastName.includes(value.toLowerCase()) ||
          emailAddress.includes(value.toLowerCase())
        );
      });
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  };

  const employeeList = filteredEmployees || [];

  if (employeeList.length > 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Employees</h1>
        <p>There are {employeeList.length} employees</p>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className={styles.filter}>
            <span>Filter by</span>
            <button className={styles.filterButton}>▼</button>
          </div>
          <div>
            <button className={styles.newEmployeeButton} onClick={showAddModal}>
              Add Employee
            </button>
          </div>
        </div>
        <div className={styles.employeeList}>
          {employeeList.map((employee) => (
            <div key={employee.employee?.id} className={styles.employeeCard}>
              <span>
                <Button
                  className={styles.buttonContainer}
                  onClick={() => showDeleteModal(employee)}
                  icon={<DeleteOutlined />}
                ></Button>
                <span></span>
                <Button
                  className={styles.buttonContainer}
                  onClick={() => handleEdit(employee)}
                  icon={<EditOutlined />}
                ></Button>
              </span>
              <span>{employee.employee?.firstName}</span>
              <span>{employee.employee?.lastName}</span>
              <span>{employee.employee?.contactNumber}</span>
            </div>
          ))}
          <AddEmployeeModal
            visible={isAddModalVisible}
            onCancel={() => {
              setIsAddModalVisible(false);
            }}
            onFinish={onAddFinish}
            form={form}
          />
          <DeleteBookModal
            visible={isDeleteModalVisible}
            onCancel={() => setIsDeleteModalVisible(false)}
            onDelete={() => {
              if (deleteBookstate) {
                handleDelete(deleteBookstate);
              } else {
                console.error("No employee selected for deletion");
              }
            }}
          />
          <EditEmployeeModal
            visible={isEditModalVisible}
            onCancel={() => setIsEditModalVisible(false)}
            onFinishUpdate={onFinishUpdate}
            onOk={() => setIsEditModalVisible(false)}
            form={form}
            selectedEmployeeForEdit={selectedEmployeeForEdit}
          />
        </div>
      </div>
    );
  } else {
    return <EmptyEmployeeList />;
  }
};

export default EmployeeList;
