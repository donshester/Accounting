import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service.dto';
import { EmployeeModel } from '../core/models/employee.model';
import { Repositories } from "../core/constants";

@Module({
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
