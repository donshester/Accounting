import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {DepartmentModel} from "./models/department.model";
import {DepartmentService} from "./department.service";
import {DepartmentController} from "./department.controller";


@Module({
    imports:[SequelizeModule.forFeature([DepartmentModel])],
    providers:[DepartmentService],
    controllers:[DepartmentController]

})
export class DepartmentModule{

}