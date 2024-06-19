import { createContext } from "react";
import {
  IEmployee,
  IEmployeeInput,
  IEmployeeActionContext,
  IEmployeeStateContext,
} from "./interface";

export const INITIAL_STATE: IEmployeeStateContext = {
  isDefault: true,
};

const EmployeeContext = createContext<IEmployeeStateContext>(INITIAL_STATE);

const EmployeeActionContext = createContext<IEmployeeActionContext>({
  getEmployees: async () => [] as IEmployee[],
  createEmployee: async () => {},
  updateEmployee: async () => {},
  getEmployeeById: async (id: string) => ({}),
  deleteEmployee: async (id: string) => {},
});

export { EmployeeContext, EmployeeActionContext };
