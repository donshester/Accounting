import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service.dto';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeModel } from '../core/models/employee.model';
import { EmployeeProviders } from './database.providers';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, ...EmployeeProviders],
})
export class EmployeeModule {}
