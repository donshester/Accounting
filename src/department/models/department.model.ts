import { Column, Table, Model, HasMany, CreatedAt, HasOne } from "sequelize-typescript";
import { EmployeeModel } from "../../employee/models/employee.model";


@Table
export class DepartmentModel extends Model{
    @Column
    title: string;

    @Column
    headId: number;

    @Column
    @CreatedAt
    creationDate: Date;

    @Column
    departmentInfo: string;


    @HasMany(() => EmployeeModel)
    employees: EmployeeModel[];
}