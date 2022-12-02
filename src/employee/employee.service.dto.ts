import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { EmployeeModel } from "./models/employee.model";
import { CreateEmployeeDto } from "./dto/create-employee.dto";


@Injectable()
export class EmployeeService{
    constructor(@InjectModel(EmployeeModel) private Employee: typeof EmployeeModel) {
    }

    async findAll(): Promise<EmployeeModel[]>{
        return this.Employee.findAll();
    }

    create(employeeDto:CreateEmployeeDto): Promise<EmployeeModel> {
        const newEmployee = new EmployeeModel();

        newEmployee.departmentId = employeeDto.departmentId;
        newEmployee.post = employeeDto.post;
        newEmployee.surname = employeeDto.surname;
        newEmployee.firstName = employeeDto.firstName;

        return newEmployee.save();
    }

    async getById(id: string): Promise<EmployeeModel> {
        return await this.Employee.findOne({
            where:{
                id: id
            }
        });
    }

    async remove(id: string): Promise<void> {
        const employee = await this.getById(id);
        await employee.destroy();
    }
}