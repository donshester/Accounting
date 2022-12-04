import { Module } from "@nestjs/common";
import {EmployeeController} from "./employee.controller";
import {EmployeeService} from "./employee.service.dto";
import {SequelizeModule} from "@nestjs/sequelize";
import {EmployeeModel} from "./models/employee.model";
import { EmployeeProviders } from "./database.providers";


@Module({
    imports:[SequelizeModule.forFeature([EmployeeModel])],
    controllers:[EmployeeController],
    providers:[EmployeeService, ...EmployeeProviders],
    //exports:[EmployeeService]
})
export class EmployeeModule{

}