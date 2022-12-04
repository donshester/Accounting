import {
    Column,
    Table,
    Model,
    HasMany,
    HasOne,
    BelongsTo,
    AutoIncrement,
    Unique,
    ForeignKey, PrimaryKey
} from "sequelize-typescript";
import { DepartmentModel } from "../../department/models/department.model";
import { DepartmentService } from "../../department/department.service";
import { DepartmentModule } from "../../department/department.module";

@Table
export class EmployeeModel extends Model{

    @AutoIncrement
    @Unique
    @PrimaryKey
    @Column
    id: number;

    @Column
    firstName: string

    @Column
    surname: string

    @Column
    post: string

    @ForeignKey(() => DepartmentModel)
    @BelongsTo(() => DepartmentModel,'id')
    departmentId: DepartmentModel;
}