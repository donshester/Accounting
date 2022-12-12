import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { DepartmentService } from "./department.service";


@Controller('department')
export class DepartmentController{
    constructor(private readonly departmentService: DepartmentService) {
    }

    @Get()
    getAll(){
        return this.departmentService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createDepartment: CreateDepartmentDto){
        return this.departmentService.create(createDepartment);
    }

    @Delete(':id')
    deleteDepartment(@Param('id') id: number) {
        return this.departmentService.remove(id);
    }

    // @Get(':id')
    // getOneDepartment(@Param('id') id: number) {
    //     return this.departmentService.getById(id);
    // }

    @Get(':id')
    countEmployees(@Param('id') id: number){
        return this.departmentService.countEmployees(id);
    }

}