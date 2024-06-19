import { EmployeeActionEnum } from "./actions";
import { IEmployeeStateContext } from "./interface";

export function EmployeeReducer(
  incomingState: IEmployeeStateContext,
  action: ReduxActions.Action<IEmployeeStateContext>
): IEmployeeStateContext {
  const { type, payload } = action;

  switch (type) {
    case EmployeeActionEnum.createEmployeeRequest:
      return { ...incomingState, ...payload };
    // case OrderActionEnum.getOrdersRequest:
    //     return { ...incomingState, ...payload };
    case EmployeeActionEnum.updateEmployeeRequest:
      return { ...incomingState, ...payload };
    case EmployeeActionEnum.deleteEmployeeRequest:
      return { ...incomingState, ...payload };
    case EmployeeActionEnum.getEmployeesRequest:
      return { ...incomingState, ...payload };
    case EmployeeActionEnum.getEmployeeRequest:
      return { ...incomingState, ...payload };
    case EmployeeActionEnum.setIsDefaultRequestAction:
      return { ...incomingState, ...payload };
    default:
      return incomingState;
  }
}
