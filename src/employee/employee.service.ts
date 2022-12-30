import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { EmployeeEntity } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { DepartmentEntity } from '../department/department.enitity';

@Injectable()
export class EmployeeService {
  @InjectRepository(EmployeeEntity)
  private readonly employeeRepository: Repository<EmployeeEntity>;

  @InjectRepository(DepartmentEntity)
  private readonly departmentRepository: Repository<DepartmentEntity>;

  async findAll(): Promise<EmployeeEntity[]> {
    return this.employeeRepository.find({
      relations: {
        departmentId: true,
        headOf: true,
      },
    });
  }

  async findDepartment(id: number): Promise<DepartmentEntity> {
    return await this.departmentRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: {
        headEmployee: true,
        employees: true,
      },
    });
  }

  async create(
    employeeDto: CreateEmployeeDto,
    department: DepartmentEntity,
  ): Promise<EmployeeEntity> {
    department.employeesCount++;
    await this.departmentRepository.save(department);

    let newEmployee: EmployeeEntity;
    if (employeeDto.isHead == false) {
      newEmployee = this.employeeRepository.create({
        firstName: employeeDto.firstName,
        surname: employeeDto.surname,
        post: employeeDto.post,
        departmentId: department,
        headOf: null,
      });
    } else if (department.headEmployee == null && employeeDto.isHead == true) {
      newEmployee = this.employeeRepository.create({
        firstName: employeeDto.firstName,
        surname: employeeDto.surname,
        post: employeeDto.post,
        departmentId: department,
        headOf: department,
      });
    } else {
      department.employeesCount--;
      await this.departmentRepository.save(department);
      throw new InternalServerErrorException('Department has a head!');
    }

    return await this.employeeRepository.save(newEmployee);
  }

  async remove(employee: EmployeeEntity): Promise<void> {
    const department = await this.departmentRepository.findOneByOrFail({
      id: employee.departmentId.id,
    });

    if (
      department.headEmployee.id === employee.id &&
      department.employeesCount != 1
    ) {
      return alert('You need to delete all employees before you delete head!');
    }

    department.employeesCount--;

    await this.departmentRepository.save(department);

    await this.employeeRepository.delete(employee);
  }

  async search(query: string): Promise<EmployeeEntity[]> {
    return this.employeeRepository.find({
      relations: {
        departmentId: true,
        headOf: true,
      },
      where: {
        surname: ILike(`${query}%`),
      },
    });
  }

  async getById(id: number): Promise<EmployeeEntity> {
    return this.employeeRepository.findOneOrFail({
      where: { id: id },
      relations: {
        departmentId: true,
        headOf: true,
      },
    });
  }
}
