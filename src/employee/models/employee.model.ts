import {
    Column,
    Table,
    Model,
    HasMany,
    HasOne,
    BelongsTo,
    AutoIncrement,
    Unique,
    ForeignKey, PrimaryKey, DataType
} from "sequelize-typescript";
import { DepartmentModel } from "../../department/models/department.model";
import { DepartmentService } from "../../department/department.service";
import { DepartmentModule } from "../../department/department.module";

@Table
export class EmployeeModel extends Model<EmployeeModel>{

    @AutoIncrement
    @Unique
    @PrimaryKey
    @Column
    id: string;

    @Column
    firstName: string

    @Column
    surname: string

    @Column
    post: string

    @BelongsTo(() => DepartmentModel)
    user: DepartmentModel;

    @ForeignKey(() => DepartmentModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    departmentId: string;
}