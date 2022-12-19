import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from '../department/department.enitity';
import { EmployeeEntity } from '../employee/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity, EmployeeEntity])],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
