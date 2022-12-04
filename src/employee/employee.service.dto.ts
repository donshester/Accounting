import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { EmployeeModel } from "./models/employee.model";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import sequelize from "sequelize";
import { EMPLOYEE_REPOSITORY } from "../core/constants";


@Injectable()
export class EmployeeService{
    constructor(@Inject(EMPLOYEE_REPOSITORY) private Employee: typeof EmployeeModel) {
    }

    async findAll(): Promise<EmployeeModel[]>{
        return this.Employee.findAll<EmployeeModel>();
    }

    create(employeeDto:CreateEmployeeDto): Promise<EmployeeModel> {
        const newEmployee = new EmployeeModel();

        newEmployee.departmentId = employeeDto.departmentId;
        newEmployee.post = employeeDto.post;
        newEmployee.surname = employeeDto.surname;
        newEmployee.firstName = employeeDto.firstName;
        newEmployee.id=employeeDto.id;

        return newEmployee.save();
    }

    async getById(id: number): Promise<EmployeeModel> {
        return await this.Employee.findOne<EmployeeModel>({

            where:{
                id: id
            }
        });
    }

    async remove(id: number): Promise<void> {
        const employee = await this.getById(id);
        await employee.destroy();
    }

    async filterAsc(): Promise<EmployeeModel[]> {
        return await this.Employee.findAll({
            order: [["surname", 'ASC']]
        })
    }

    async filterDesc(): Promise<EmployeeModel[]> {
        return await this.Employee.findAll<EmployeeModel>({
            order: [["surname", 'DESC']]
        })
    }

    async lastEmployees(): Promise<EmployeeModel[]>{
        return await this.Employee.findAll<EmployeeModel>({
            order: [['createdAt', 'DESC']],
            limit: 5
        })
    }
}