import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post} from "@nestjs/common";
import {CreateEmployeeDto} from "./dto/create-employee.dto";
import {EmployeeService} from "./employee.service.dto";

@Controller('employee')
export class EmployeeController{
    constructor(private readonly employeeService: EmployeeService) {
    }

    @Get()
    getAll(){
        return this.employeeService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createEmployee: CreateEmployeeDto){
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
}