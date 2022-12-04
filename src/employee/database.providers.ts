import { EMPLOYEE_REPOSITORY } from "../core/constants";
import { EmployeeModel } from "./models/employee.model";

export const EmployeeProviders = [{
    provide: EMPLOYEE_REPOSITORY,
    useValue: EmployeeModel,
}];