import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from '../employee/employee.entity';
import { Repository } from 'typeorm';
import { DepartmentEntity } from '../department/department.enitity';

@Injectable()
export class DashboardService {
  @InjectRepository(EmployeeEntity)
  private readonly employeeRepository: Repository<EmployeeEntity>;

  @InjectRepository(DepartmentEntity)
  private readonly departmentRepository: Repository<DepartmentEntity>;

  async lastEmployees(): Promise<EmployeeEntity[]> {
    try {
      return this.employeeRepository.find({
        relations: {
          departmentId: true,
          headOf: true,
        },
        order: { creationDate: 'DESC' },
        take: 5,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async topDepartments(): Promise<DepartmentEntity[]> {
    try {
      return await this.departmentRepository.find({
        order: {
          employeesCount: 'DESC',
        },
        take: 5,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
