import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeModel } from '../core/models/employee.model';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { Repositories } from '../core/constants';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { DepartmentService } from '../department/department.service';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly departmentService: DepartmentService,
    @Inject(Repositories.EMPLOYEE) private Employee: typeof EmployeeModel,
  ) {}

  async findAll(
    page = 1,
    limit = 10,
    sort: 'asc' | 'desc',
  ): Promise<EmployeeModel[]> {
    return this.Employee.findAll<EmployeeModel>({
      order: [['surname', sort]],
      limit: limit,
      offset: (page - 1) * limit,
    });
  }

  create(employeeDto: CreateEmployeeDto): Promise<EmployeeModel> {
    const newEmployee = new EmployeeModel({ ...employeeDto });
    return newEmployee.save();
  }

  async getById(id: string): Promise<EmployeeModel> {
    const employee = await this.Employee.findOne<EmployeeModel>({
      where: {
        id: id,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  async remove(id: string): Promise<{ message: string }> {
    const employee = await this.getById(id);
    await employee.destroy();
    return { message: 'Employee successfully deleted' };
  }
  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeModel> {
    const employee = await this.getById(id);

    if (updateEmployeeDto.departmentId !== undefined) {
      if (updateEmployeeDto.departmentId === null) {
        const department = await this.departmentService.getById(
          employee.departmentId,
        );
        if (department && department.headId === id) {
          department.headId = null;
          await department.save();
        }

        employee.departmentId = null;
      } else {
        await this.departmentService.getById(updateEmployeeDto.departmentId);
        employee.departmentId = updateEmployeeDto.departmentId;
      }
    }

    Object.assign(employee, updateEmployeeDto);

    await employee.save();

    return employee;
  }
}
