import { Inject, Injectable } from "@nestjs/common";
import {DepartmentModel} from "./models/department.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateDepartmentDto} from "./dto/create-department.dto";
import sequelize from "sequelize";
import { DEPARTMENT_REPOSITORY } from "../core/constants";

@Injectable()
export class DepartmentService{
    constructor(@Inject(DEPARTMENT_REPOSITORY) private readonly Department: typeof DepartmentModel) {
    }

    async findAll(): Promise<DepartmentModel[]>{
        return this.Department.findAll<DepartmentModel>();
    }


    async create(departmentDto:CreateDepartmentDto): Promise<DepartmentModel>{
        const newDepartment = new DepartmentModel();

        newDepartment.title = departmentDto.title;
        newDepartment.departmentInfo = departmentDto.departmentInfo;
        newDepartment.headId = departmentDto.headId;
        newDepartment.creationDate = departmentDto.createdDate;
        newDepartment.employees=departmentDto.employees;

        return newDepartment.save();
    }

    async getById(id: number): Promise<DepartmentModel> {
        return await this.Department.findOne<DepartmentModel>({
            where:{
                id: id
            }
        });
    }

    async countEmployees(id: number): Promise<DepartmentModel> {
        return await this.Department.findOne<DepartmentModel>({
            attributes: [[sequelize.fn('COUNT', sequelize.col('employees')), 'n_employees']],
            where:{
                id: id
            }
        })
    }

    async remove(id: number): Promise<void> {
        const department = await this.getById(id);
        await department.destroy();
    }

}