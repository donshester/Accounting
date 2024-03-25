import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { DepartmentProviders } from './department.providers';

@Module({
  providers: [DepartmentService, ...DepartmentProviders],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
