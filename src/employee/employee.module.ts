import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeModel } from '../core/models/employee.model';
import { Repositories } from '../core/constants';
import { DepartmentModule } from '../department/department.module';

@Module({
  imports: [DepartmentModule],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    {
      provide: Repositories.EMPLOYEE,
      useValue: EmployeeModel,
    },
  ],
})
export class EmployeeModule {}
