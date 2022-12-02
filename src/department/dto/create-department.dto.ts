import {IsDate, IsNotEmpty, IsNumber} from "class-validator";

export class CreateDepartmentDto{


    @IsNotEmpty()
    readonly title: string;

    @IsNumber()
    readonly headId: number;

    @IsDate()
    readonly createdDate: Date;

    readonly departmentInfo: string;
}