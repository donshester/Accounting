import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from './employee.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAll() {
    const employees = await this.employeeService.findAll();
    if (!employees) {
      throw new NotFoundException();
    }
    return employees;
  }

  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createEmployee: CreateEmployeeDto) {
    const department = await this.employeeService.findDepartment(
      createEmployee.departmentId,
    );
    if (!department) {
      throw new NotFoundException('Department not exist!');
    }
    await this.employeeService.create(createEmployee, department);
  }

  @Delete(':id')
  async deleteEmployee(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    const employee = await this.employeeService.getById(id);
    if (!employee) {
      throw new NotFoundException('Employee not found!');
    }
    await this.employeeService.remove(employee);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.employeeService.search(query);
  }

  @Get('/:id')
  async getOneEmployee(@Param('id', ParseIntPipe) id: number) {
    let employee: EmployeeEntity;
    try {
      employee = await this.employeeService.getById(id);
    } catch (error) {
      throw new NotFoundException('Employee not found!');
    }
    return employee;
  }
}
