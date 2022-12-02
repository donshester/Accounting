import {IsNotEmpty} from "class-validator";

export class DeleteEmployeeDto{
    readonly firstName: string
    readonly surname: string
    readonly post: string
    readonly departmentName: string;
}