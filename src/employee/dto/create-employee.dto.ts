import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from "class-validator";


export class CreateEmployeeDto{


    @IsNotEmpty()
    readonly firstName: string

    @IsNotEmpty()
    readonly surname: string

    @IsNotEmpty()
    readonly post: string

    @IsBoolean()
    readonly IsHead:boolean;

    @IsNumber()
    readonly departmentId: number;
}