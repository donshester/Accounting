import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentService } from './department.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEmployeeDto } from '../employee/dto/create-employee.dto';
import { DepartmentEntity } from './department.enitity';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  getAll() {
    try {
      return this.departmentService.getAll();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createDepartment: CreateDepartmentDto) {
    try {
      return this.departmentService.create(createDepartment);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async deleteDepartment(@Param('id') id: number) {
    await this.departmentService.remove(id);
  }

  @Get(':id')
  async getOneDepartment(@Param('id', ParseIntPipe) id: number) {
    let department: DepartmentEntity;
    try {
      department = await this.departmentService.getById(id);
    } catch (error) {
      throw new NotFoundException();
    }
    return department;
  }
  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  createEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() createEmployee: CreateEmployeeDto,
  ) {
    return this.departmentService.addEmployee(id, createEmployee);
  }
}
