import {Injectable} from "@nestjs/common";
import {DepartmentModel} from "./models/department.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateDepartmentDto} from "./dto/create-department.dto";
import sequelize from "sequelize";

@Injectable()
export class DepartmentService{
    constructor(@InjectModel(DepartmentModel) private Department: typeof DepartmentModel) {
    }

    async findAll(): Promise<DepartmentModel[]>{
        return this.Department.findAll();
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
        return await this.Department.findOne({
            where:{
                id: id
            }
        });
    }

    async countEmployees(id: number): Promise<DepartmentModel> {
        return await this.Department.findOne({
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