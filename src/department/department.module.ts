import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { Repositories } from '../core/constants';
import { DepartmentModel } from '../core/models/department.model';

@Module({
  controllers: [DepartmentController],
  providers: [
    DepartmentService,
    {
      provide: Repositories.DEPARTMENT,
      useValue: DepartmentModel,
    },
  ],
})
export class DepartmentModule {}
