import {
    Column,
    Table,
    Model,
    HasMany,
    HasOne,
    BelongsTo,
    AutoIncrement,
    Unique,
    ForeignKey
} from "sequelize-typescript";
import { DepartmentModel } from "../../department/models/department.model";
import { DepartmentService } from "../../department/department.service";
import { DepartmentModule } from "../../department/department.module";

@Table
export class EmployeeModel extends Model{

    @Column
    @AutoIncrement
    @Unique
    @ForeignKey(() => DepartmentModel)
    id: number;

    @Column
    firstName: string

    @Column
    surname: string

    @Column
    post: string

    @BelongsTo(() => DepartmentModel,'id')
    departmentId: number;
}