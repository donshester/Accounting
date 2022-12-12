import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmployeeEntity } from "./employee.entity";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import {DepartmentService} from "../department/department.service";

@Injectable()
export class EmployeeService{
    @InjectRepository(EmployeeEntity)
    private readonly repository: Repository<EmployeeEntity>;

    async findAll(): Promise<EmployeeEntity[]>{
        return this.repository.find();
    }

    create(employeeDto: CreateEmployeeDto): Promise<EmployeeEntity> {
        const newEmployee = new EmployeeEntity();

        newEmployee.post = employeeDto.post;
        newEmployee.surname = employeeDto.surname;
        newEmployee.firstName = employeeDto.firstName;

        return this.repository.save(newEmployee);
    }

    async getById(id: number): Promise<EmployeeEntity> {
        return await this.repository.findOne( {
            where: {
            id: id,
        }},)
    }

    async remove(id: number): Promise<void> {
        await this.repository.delete({id:id });
    }


    async lastEmployees(): Promise<EmployeeEntity[]>{
        return this.repository.find({
                order:{
                    "creationDate": "DESC"
            }, take:5
            })
    }

}