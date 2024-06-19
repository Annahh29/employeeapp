import { createAction } from "redux-actions";
import { IEmployee, IEmployeeInput, IEmployeeStateContext } from "./interface";

export enum EmployeeActionEnum {
  getEmployeesRequest = "GET_EMPLOYEES",
  getEmployeeRequest = "GET_EMPLOYEE_BY_ID",
  createEmployeeRequest = "CREATE_EMPLOYEE",
  deleteEmployeeRequest = "DELETE_EMPLOYEE",
  updateEmployeeRequest = "UPDATE_EMPLOYEE",
  setIsDefaultRequestAction = "SET_IS_DEFAULT_REQUEST",
}

export const getEmployeesRequest = createAction<
  IEmployeeStateContext,
  IEmployee[]
>(EmployeeActionEnum.getEmployeesRequest, (employees) => ({ employees }));
export const getEmployeeRequest = createAction<
  IEmployeeStateContext,
  IEmployee
>(EmployeeActionEnum.getEmployeeRequest, (employee) => ({ employee }));
export const createEmployeeRequest = createAction<
  IEmployeeStateContext,
  IEmployee
>(EmployeeActionEnum.createEmployeeRequest, (employee) => ({ employee }));
export const deleteEmployeeRequest = createAction<
  IEmployeeStateContext,
  boolean
>(EmployeeActionEnum.deleteEmployeeRequest, (isDefault: boolean) => ({
  isDefault,
}));
export const setIsDefaultRequestAction = createAction<
  IEmployeeStateContext,
  boolean
>(EmployeeActionEnum.setIsDefaultRequestAction, (isDefault: boolean) => ({
  isDefault,
}));
export const updateEmployeeRequest = createAction<
  IEmployeeStateContext,
  IEmployee
>(EmployeeActionEnum.updateEmployeeRequest, (employee) => ({ employee }));
