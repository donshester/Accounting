import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    return this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.departmentId', 'department')
      .leftJoinAndMapMany('employee.headOf', 'employee.headOf', 'headOf')
      .getMany();
  }

  async create(employeeDto: CreateEmployeeDto): Promise<EmployeeEntity> {
    let department: DepartmentEntity;
    try {
      department = await this.departmentRepository.findOneByOrFail({
        id: employeeDto.departmentId,
      });
    } catch (error) {
      throw new HttpException('Department not exist', HttpStatus.FORBIDDEN);
    }
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
      throw new HttpException('Department has a head!', HttpStatus.FORBIDDEN);
    }

    return await this.employeeRepository.save(newEmployee);
  }

  async remove(id: number): Promise<void> {
    const employee = await this.employeeRepository.findOne({
      where: { id: id },
      relations: { departmentId: true },
    });

    const department = await this.departmentRepository.findOneBy({
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

    await this.employeeRepository.delete({ id: id });
  }

  async search(query: string): Promise<EmployeeEntity[]> {
    return this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.departmentId', 'department')
      .leftJoinAndMapMany('employee.headOf', 'employee.headOf', 'headOf')
      .where('employee.surname ILIKE :query', { query: `${query}%` })
      .getMany();
  }

  async getById(id: number): Promise<EmployeeEntity> {
    return this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.departmentId', 'department')
      .leftJoinAndMapMany('employee.headOf', 'employee.headOf', 'headOf')
      .where('employee.id=:id', { id: id })
      .getOneOrFail();
  }
}
