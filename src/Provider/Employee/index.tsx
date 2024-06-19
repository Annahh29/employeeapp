"use client";

import React, {
  FC,
  PropsWithChildren,
  useReducer,
  useContext,
  useState,
} from "react";
import { EmployeeReducer } from "./reducer";
import {
  INITIAL_STATE,
  EmployeeActionContext,
  EmployeeContext,
} from "./context";
import {
  getEmployeesRequest,
  getEmployeeRequest,
  createEmployeeRequest,
  deleteEmployeeRequest,
  updateEmployeeRequest,
  setIsDefaultRequestAction,
} from "./actions";
import { IEmployee } from "./interface";

const EmployeeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(EmployeeReducer, INITIAL_STATE);

  const getEmployees = async () => {
    dispatch(setIsDefaultRequestAction(true));
    const token = localStorage.getItem("token");
    await fetch(
      "https://localhost:44311/api/services/app/Employee/GetAllEmployees",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer  ${token}`,
        },
      }
    ).then((res) => {
      res.json().then((data) => {
        dispatch(getEmployeesRequest(data.result));
      });
    });
  };

  const createEmployee = async (orderInfo: IEmployee) => {
    const token = localStorage.getItem("token");
    await fetch(
      "https://localhost:44311/api/services/app/Employee/CreateEmployeeIncludingSkills",
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(orderInfo),
      }
    ).then((res) => {
      res.json().then((data) => {
        dispatch(createEmployeeRequest(orderInfo));
      });
    });
  };

  const updateEmployee = async (employeeInfo: IEmployee) => {
    const token = localStorage.getItem("token");
    await fetch(
      "https://localhost:44311/api/services/app/Employee/UpdateEmployee",
      {
        method: "PUT",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(employeeInfo),
      }
    ).then((res) => {
      res.json().then((data) => {
        dispatch(updateEmployeeRequest(employeeInfo));
        localStorage.setItem("order", JSON.stringify(data.result));
      });
    });
  };

  const getEmployeeById = async (id: string) => {
    const token = localStorage.getItem("token");
    await fetch(
      `https://localhost:44311/api/services/app/Employee/GetEmployee?id=${id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer  ${token}`,
        },
      }
    ).then((res) => {
      res.json().then((data) => {
        dispatch(getEmployeeRequest(data.result));
        console.log("dataaa", data.result);
      });
    });
  };

  const deleteEmployee = async (id: string) => {
    const token = localStorage.getItem("token");
    await fetch(
      `https://localhost:44311/api/services/app/Employee/DeleteEmployee?id=${id}`,
      {
        method: "DELETE",
        cache: "no-cache",
        headers: {
          Authorization: `Bearer  ${token}`,
        },
      }
    ).then((res) => {
      res.json().then((data) => {
        dispatch(deleteEmployeeRequest(data.result));
      });
    });
  };

  return (
    <EmployeeContext.Provider value={state}>
      <EmployeeActionContext.Provider
        value={{
          getEmployees,
          getEmployeeById,
          updateEmployee,
          deleteEmployee,
          createEmployee,
        }}
      >
        {children}
      </EmployeeActionContext.Provider>
    </EmployeeContext.Provider>
  );
};
function useEmployeeState() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function useEmployeeActions() {
  const context = useContext(EmployeeActionContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function useEmployees() {
  return {
    ...useEmployeeState(),
    ...useEmployeeActions(),
  };
}

export { useEmployeeState, EmployeeProvider, useEmployeeActions, useEmployees };
