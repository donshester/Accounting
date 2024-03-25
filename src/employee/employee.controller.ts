import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: 'asc' | 'desc',
  ) {
    return this.employeeService.findAll(page, limit, sort);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createEmployee: CreateEmployeeDto) {
    return this.employeeService.create(createEmployee);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }

  @Get(':id')
  getOneEmployee(@Param('id') id: string) {
    return this.employeeService.getById(id);
  }

  @Patch(':id')
  updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }
}
