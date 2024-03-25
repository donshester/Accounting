import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DepartmentModel } from '../core/models/department.model';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { ForeignKeyConstraintError } from 'sequelize';
import { Repositories } from '../core/constants';
import { EmployeeModel } from '../core/models/employee.model';
@Injectable()
export class DepartmentService {
  constructor(
    @Inject(Repositories.DEPARTMENT)
    private readonly Department: typeof DepartmentModel,
    @Inject(Repositories.EMPLOYEE)
    private readonly Employee: typeof EmployeeModel,
  ) {}

  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{ departments: DepartmentModel[]; total: number }> {
    const { count, rows } =
      await this.Department.findAndCountAll<DepartmentModel>({
        limit,
        offset: (page - 1) * limit,
      });

    return {
      departments: rows,
      total: count,
    };
  }

  async create(departmentDto: CreateDepartmentDto): Promise<DepartmentModel> {
    let head = null;
    if (departmentDto.headId) {
      head = await this.Employee.findByPk(departmentDto.headId);
      if (!head) {
        throw new BadRequestException('Head not found');
      }
    }

    const employees = await this.Employee.findAll({
      where: { id: departmentDto.employeeIds },
    });
    if (employees.length !== departmentDto.employeeIds.length) {
      throw new BadRequestException('Some employees not found');
    }

    const newDepartment = new DepartmentModel({
      ...departmentDto,
      headId: head ? head.id : null,
      employees: employees,
    });

    return newDepartment.save();
  }
  async getById(id: string): Promise<DepartmentModel> {
    const department = await this.Department.findOne<DepartmentModel>({
      where: {
        id: id,
      },
      attributes: ['id', 'title', 'creationDate', 'departmentInfo'],
      include: [
        {
          model: this.Employee,
          as: 'head',
        },
      ],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department;
  }
  async getEmployeesByDepartmentId(id: string): Promise<EmployeeModel[]> {
    const department = await this.Department.findOne<DepartmentModel>({
      where: {
        id: id,
      },
      include: [
        {
          model: this.Employee,
          as: 'employees',
        },
      ],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department.employees;
  }
  async remove(id: string): Promise<void> {
    try {
      const department = await this.getById(id);
      await department.destroy();
    } catch (error) {
      if (error instanceof ForeignKeyConstraintError) {
        throw new BadRequestException(
          'Cannot delete department with associated employees or head',
        );
      }
      throw new BadRequestException('Failed to delete department');
    }
  }

  async setHead(
    departmentId: string,
    employeeId: string,
  ): Promise<DepartmentModel> {
    const department = await this.Department.findOne<DepartmentModel>({
      where: {
        id: departmentId,
      },
    });

    if (!department) {
      throw new NotFoundException(
        `Department with ID ${departmentId} not found`,
      );
    }

    if (department.headId) {
      throw new BadRequestException('This department already has a head');
    }

    const employee = await this.Employee.findOne<EmployeeModel>({
      where: {
        id: employeeId,
      },
      include: [
        {
          model: this.Department,
          as: 'department',
        },
      ],
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    if (employee.department) {
      throw new BadRequestException(
        'This employee is part of another department',
      );
    }

    department.headId = employeeId;
    department.employees.push(employee);
    await department.save();

    employee.departmentId = departmentId;
    await employee.save();

    return department;
  }
}
