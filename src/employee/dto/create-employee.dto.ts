import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { DepartmentModel } from "../../department/models/department.model";

export class CreateEmployeeDto{
    @IsNotEmpty()
    readonly firstName: string

    @IsNotEmpty()
    readonly surname: string

    @IsNotEmpty()
    readonly post: string

    @IsNumber()
    readonly departmentId: DepartmentModel;

    @IsNumber()
    @IsNotEmpty()
    readonly id: number;
}