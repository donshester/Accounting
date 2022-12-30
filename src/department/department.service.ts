import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from './department.enitity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { EmployeeEntity } from '../employee/employee.entity';
import { CreateEmployeeDto } from '../employee/dto/create-employee.dto';

@Injectable()
export class DepartmentService {
  @InjectRepository(DepartmentEntity)
  private readonly departmentRepository: Repository<DepartmentEntity>;

  @InjectRepository(EmployeeEntity)
  private readonly employeeRepository: Repository<EmployeeEntity>;

  async create(departmentDto: CreateDepartmentDto): Promise<DepartmentEntity> {
    const newDepartment = await this.departmentRepository.create({
      title: departmentDto.title,
      departmentInfo: departmentDto.departmentInfo,
      employeesCount: 0,
      headEmployee: null,
    });
    try {
      return await this.departmentRepository.save(newDepartment);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'Department with this name is already exist!',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getById(id: number): Promise<DepartmentEntity> {
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

  async remove(id: number): Promise<void> {
    try {
      await this.departmentRepository.delete({ id: id });
    } catch (error) {
      if (error.code === '23503') {
        throw new ConflictException(
          'Department must have no employees to delete it!',
        );
      } else {
        throw new InternalServerErrorException('Department cant be deleted!');
      }
    }
  }

  async getAll(): Promise<DepartmentEntity[]> {
    return this.departmentRepository.find();
  }

  async addEmployee(id: number, employeeDto: CreateEmployeeDto) {
    let department: DepartmentEntity;
    try {
      department = await this.departmentRepository.findOneByOrFail({
        id: id,
      });
    } catch (error) {
      throw new InternalServerErrorException('Department not exist');
    }
    department.employeesCount++;
    await this.departmentRepository.save(department);

    let newEmployee: EmployeeEntity;
    if (employeeDto.isHead) {
      newEmployee = this.employeeRepository.create({
        firstName: employeeDto.firstName,
        surname: employeeDto.surname,
        post: employeeDto.post,
        departmentId: department,
        headOf: null,
      });
    } else if (department.headEmployee == null && employeeDto.isHead) {
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
}
