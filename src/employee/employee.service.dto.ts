import { Inject, Injectable } from '@nestjs/common';
import { EmployeeModel } from '../core/models/employee.model';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { Repositories } from '../core/constants';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(Repositories.EMPLOYEE) private Employee: typeof EmployeeModel,
  ) {}

  async findAll(): Promise<EmployeeModel[]> {
    return this.Employee.findAll<EmployeeModel>();
  }

  create(employeeDto: CreateEmployeeDto): Promise<EmployeeModel> {
    const newEmployee = new EmployeeModel({ ...employeeDto });
    return newEmployee.save();
  }

  async getById(id: number): Promise<EmployeeModel> {
    return await this.Employee.findOne<EmployeeModel>({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const employee = await this.getById(id);
    await employee.destroy();
  }

  async filterAsc(): Promise<EmployeeModel[]> {
    return await this.Employee.findAll({
      order: [['surname', 'ASC']],
    });
  }

  async filterDesc(): Promise<EmployeeModel[]> {
    return await this.Employee.findAll<EmployeeModel>({
      order: [['surname', 'DESC']],
    });
  }
}
