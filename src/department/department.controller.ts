import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dtos/create-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  getAll() {
    return this.departmentService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDepartment: CreateDepartmentDto) {
    return this.departmentService.create(createDepartment);
  }

  @Delete(':id')
  deleteDepartment(@Param('id') id: number) {
    return this.departmentService.remove(id);
  }

  @Get(':id')
  getOneDepartment(@Param('id') id: number) {
    return this.departmentService.getById(id);
  }
}
