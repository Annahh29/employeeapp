export interface IEmployeeInput {
    firstName?: string;
    lastName?: string;
    id?: string;
    department?: string;
    dateOfBirth?: string;
    addressId?: string;
    contactNumber?: string;
    emailAddress?: string;
  }
  
  export interface IAddress {
    id?: string;
    street?: string;
    city?: string;
    country?: string;
    zipCode?: string;
  }
  
  export interface ISkill {
    id?: string;
    seniorityRating?: number;
    yearsOfExperience?: number;
    name?: string;
  }
  
  export interface IEmployee {
    employee?: IEmployeeInput;
    address?: IAddress;
    skills?: ISkill[];
  }

  export interface IEmployeeStateContext {
    readonly employee?: IEmployee;
    readonly employees?: IEmployee[];
    readonly isDefault?: boolean;
  }

export interface IEmployeeActionContext {
    createEmployee: (payload: IEmployee) => void;
    updateEmployee: (payload: IEmployee) => void;
    deleteEmployee: (id: string) => void;
    getEmployees: () => void;
    getEmployeeById: (id: string) => void;
  }