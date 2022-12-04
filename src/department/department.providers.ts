import { DepartmentModel } from "./models/department.model";
import { DEPARTMENT_REPOSITORY } from "../core/constants";

export const DepartmentProviders = [{
    provide: DEPARTMENT_REPOSITORY,
    useValue: DepartmentModel,
}];