import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dtos/create-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  getAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.departmentService.findAll(page, limit);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDepartment: CreateDepartmentDto) {
    return this.departmentService.create(createDepartment);
  }

  @Delete(':id')
  deleteDepartment(@Param('id') id: string) {
    return this.departmentService.remove(id);
  }

  @Get(':id')
  getOneDepartment(@Param('id') id: string) {
    return this.departmentService.getById(id);
  }

  @Get(':id/employees')
  getDepartmentEmployees(@Param('id') id: string) {
    return this.departmentService.getEmployeesByDepartmentId(id);
  }

  @Post(':departmentId/set-head')
  setDepartmentHead(
    @Param('departmentId') departmentId: string,
    @Body('employeeId') employeeId: string,
  ) {
    return this.departmentService.setHead(departmentId, employeeId);
  }
}
