import {
    Column,
    Table,
    Model,
    HasMany,
    CreatedAt,
    HasOne,
    AutoIncrement,
    Unique,
    PrimaryKey, BelongsTo
} from "sequelize-typescript";

import { EmployeeModel } from "../../employee/models/employee.model";

@Table
export class DepartmentModel extends Model{

    @AutoIncrement
    @Unique
    @PrimaryKey
    @Column
    id: number;

    @Column
    title: string;

    @Unique
    @Column
    headId: number;

    @Column
    @CreatedAt
    creationDate: Date;

    @Column
    departmentInfo: string;

    @HasMany(() => EmployeeModel, "id")
    employees?: EmployeeModel[];
}