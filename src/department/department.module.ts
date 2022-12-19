import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from './department.enitity';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { EmployeeEntity } from '../employee/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity, EmployeeEntity])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
