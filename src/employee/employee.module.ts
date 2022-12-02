import { Module } from "@nestjs/common";
import {EmployeeController} from "./employee.controller";
import {EmployeeService} from "./employee.service.dto";
import {SequelizeModule} from "@nestjs/sequelize";
import {EmployeeModel} from "./models/employee.model";


@Module({
    imports:[SequelizeModule.forFeature([EmployeeModel])],
    controllers:[EmployeeController],
    providers:[EmployeeService]
})
export class EmployeeModule{

}