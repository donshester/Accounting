import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateEmployeeDto{
    @IsNotEmpty()
    readonly firstName: string

    @IsNotEmpty()
    readonly surname: string

    @IsNotEmpty()
    readonly post: string

    @IsNumber()
    readonly departmentId: number;

}