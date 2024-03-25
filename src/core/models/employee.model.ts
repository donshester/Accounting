import {
  Column,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  DataType,
  Default,
} from 'sequelize-typescript';
import { DepartmentModel } from './department.model';

@Table({ modelName: 'employees' })
export class EmployeeModel extends Model<EmployeeModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Column
  firstName: string;

  @Column
  surname: string;

  @Column
  post: string;

  @ForeignKey(() => DepartmentModel)
  @Column
  departmentId: string;

  @BelongsTo(() => DepartmentModel)
  department: DepartmentModel;
}
