import { Injectable } from '@nestjs/common';
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
    return this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndMapMany('employee.headOf', 'employee.headOf', 'headOf')
      .leftJoinAndSelect('employee.departmentId', 'departmentId')
      .orderBy('employee.creationDate', 'DESC')
      .take(5)
      .getMany();
  }

  async topDepartments(): Promise<DepartmentEntity[]> {
    return await this.departmentRepository.find({
      order: {
        employeesCount: 'DESC',
      },
      take: 5,
    });
  }
}
