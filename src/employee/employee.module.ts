import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './employee.entity';
import { DepartmentEntity } from '../department/department.enitity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity, DepartmentEntity])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
