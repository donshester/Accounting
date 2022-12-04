import {
    Column,
    Table,
    Model,
    HasMany,
    CreatedAt,
    HasOne,
    AutoIncrement,
    Unique,
    PrimaryKey, BelongsTo, DataType
} from "sequelize-typescript";

import { EmployeeModel } from "../../employee/models/employee.model";

@Table
export class DepartmentModel extends Model<DepartmentModel>{

    @AutoIncrement
    @Unique
    @PrimaryKey
    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    id: string;

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    title: string;

    @Unique
    @Column({
        allowNull: false
    })
    headId: number;

    @Column
    @CreatedAt
    creationDate: Date;

    @Column
    departmentInfo: string;

    @HasMany(() => EmployeeModel, 'id')
    employees?: string[];
}