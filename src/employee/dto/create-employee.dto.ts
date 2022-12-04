import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { DepartmentModel } from "../../department/models/department.model";

export class CreateEmployeeDto{
    @IsNotEmpty()
    readonly firstName: string

    @IsNotEmpty()
    readonly surname: string

    @IsNotEmpty()
    readonly post: string

    readonly department: DepartmentModel;

    @IsNumber()
    readonly departmentId: string;

    @IsNumber()
    @IsNotEmpty()
    readonly id: string;
}