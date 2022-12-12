import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DepartmentEntity } from "./department.entity";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { EmployeeEntity } from "../employee/employee.entity";

@Injectable()
export class DepartmentService{
    @InjectRepository(DepartmentEntity)
    private readonly repository: Repository<DepartmentEntity>;


    async findAll(): Promise<DepartmentEntity[]>{
        return this.repository.find();
    }


    async create(departmentDto:CreateDepartmentDto): Promise<DepartmentEntity>{
        const newDepartment = new DepartmentEntity();

        newDepartment.title = departmentDto.title;
        newDepartment.departmentInfo = departmentDto.departmentInfo;
        newDepartment.headId = departmentDto.headId;

        return this.repository.save(newDepartment);
    }

    async getById(id: number): Promise<DepartmentEntity> {
        return await this.repository.findOne({
            where:{
                id: id
            }
        });
    }

    async countEmployees(id: number): Promise<DepartmentEntity> {
         return await this.repository.createQueryBuilder('department')
             .leftJoinAndSelect("department.employees", "employee")
             .select('employee')
             .where("department.id = :id",{id: id}).getOne()
    }

    async remove(id: number): Promise<void> {
        await this.repository.delete({id:id });
    }
}