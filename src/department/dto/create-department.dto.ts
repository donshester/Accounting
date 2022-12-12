import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDepartmentDto{
    @IsNotEmpty()
    readonly title: string;

    @IsNumber()
    readonly headId: number;

    @IsString()
    readonly departmentInfo: string;
}