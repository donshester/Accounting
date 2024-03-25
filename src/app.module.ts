import { Module } from '@nestjs/common';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [DepartmentModule, EmployeeModule, DatabaseModule],
})
export class AppModule {}
