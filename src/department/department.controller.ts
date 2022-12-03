import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { DepartmentService } from "./department.service";
import { CreateDepartmentDto } from "./dto/create-department.dto";

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
    deleteDepartment(@Param('id') id: string) {
        return this.departmentService.remove(id);
    }

    @Get(':id')
    getOneDepartment(@Param('id') id: string) {
        return this.departmentService.getById(id);
    }

}
