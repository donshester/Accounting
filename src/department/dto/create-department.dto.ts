import {IsDate, IsNotEmpty, IsNumber} from "class-validator";
import { EmployeeModel } from "../../employee/models/employee.model";

export class CreateDepartmentDto{

    readonly id: string;

    @IsNotEmpty()
    readonly title: string;

    @IsNumber()
    readonly headId: number;

    @IsDate()
    readonly createdDate: Date;

    readonly departmentInfo: string;

    readonly employees: string[];
}