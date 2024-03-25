import { Inject, Injectable } from '@nestjs/common';
import { DepartmentModel } from '../core/models/department.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import sequelize from 'sequelize';
import { Repositories } from "../core/constants";

@Injectable()
export class DepartmentService {
  constructor(
    @Inject(Repositories.DEPARTMENT)
    private readonly Department: typeof DepartmentModel,
  ) {}

  async findAll(): Promise<DepartmentModel[]> {
    return this.Department.findAll<DepartmentModel>();
  }

  async create(departmentDto: CreateDepartmentDto): Promise<DepartmentModel> {
    const newDepartment = new DepartmentModel({
      ...departmentDto,
    });

    return newDepartment.save();
  }

  async getById(id: number): Promise<DepartmentModel> {
    return await this.Department.findOne<DepartmentModel>({
      where: {
        id: id,
      },
    });
  }

  async countEmployees(id: number): Promise<DepartmentModel> {
    return await this.Department.findOne<DepartmentModel>({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('employees')), 'n_employees'],
      ],
      where: {
        id: id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const department = await this.getById(id);
    await department.destroy();
  }
}
