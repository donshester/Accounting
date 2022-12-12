import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from "./employee/employee.module";

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), DepartmentModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
