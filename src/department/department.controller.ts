import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
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
    return this.departmentService.getAll();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createDepartment: CreateDepartmentDto) {
    return this.departmentService.create(createDepartment);
  }

  @Delete(':id')
  async deleteDepartment(@Param('id') id: number) {
    try {
      await this.departmentService.remove(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.METHOD_NOT_ALLOWED,
          error: 'Department need to have no employees to delete it!',
        },
        HttpStatus.METHOD_NOT_ALLOWED,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  async getOneDepartment(@Param('id', ParseIntPipe) id: number) {
    let department: DepartmentEntity;
    try {
      department = await this.departmentService.getById(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not found',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
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
