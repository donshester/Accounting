import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
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
    let employees: EmployeeEntity[];
    try {
      employees = await this.employeeService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Forbidden',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
    return employees;
  }

  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createEmployee: CreateEmployeeDto) {
    return this.employeeService.create(createEmployee);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.employeeService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
      throw new NotFoundException(error);
    }
    return employee;
  }
}
