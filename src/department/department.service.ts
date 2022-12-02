import {Injectable} from "@nestjs/common";
import {DepartmentModel} from "./models/department.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateDepartmentDto} from "./dto/create-department.dto";

@Injectable()
export class DepartmentService{
    constructor(@InjectModel(DepartmentModel) private Department: typeof DepartmentModel) {
    }

    async findAll(): Promise<DepartmentModel[]>{
        return this.Department.findAll();
    }

     create(departmentDto:CreateDepartmentDto): Promise<DepartmentModel>{
        const newDepartment = new DepartmentModel();

        newDepartment.title = departmentDto.title;
        newDepartment.departmentInfo = departmentDto.departmentInfo;
        newDepartment.headId = departmentDto.headId;
        newDepartment.createdDate = departmentDto.createdDate;

        return newDepartment.save();
    }

    async getById(id: string): Promise<DepartmentModel> {
        return await this.Department.findOne({
            where:{
                id: id
            }
        });
    }

    async remove(id: string): Promise<void> {
        const department = await this.getById(id);
        await department.destroy();
    }


}