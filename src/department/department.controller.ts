import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
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
    const departments = this.departmentService.getAll();
    if (!departments) {
      throw new NotFoundException('Departments not found!');
    }
    return departments;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createDepartment: CreateDepartmentDto) {
    const department = this.departmentService.create(createDepartment);
    if (!department) {
      throw new ForbiddenException('Department was not created!');
    }
    return department;
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
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() createEmployee: CreateEmployeeDto,
  ) {
    return this.departmentService.addEmployee(id, createEmployee);
  }
}
