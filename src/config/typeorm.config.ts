import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DepartmentEntity } from "../department/department.entity";
import { EmployeeEntity } from "../employee/employee.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host:'localhost',
    port: 5432,
    username:'postgres',
    password: 'admin12345',
    database: 'postgres',
    entities: [DepartmentEntity, EmployeeEntity],
    synchronize: true
}