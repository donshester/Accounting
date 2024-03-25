import {
  Column,
  Table,
  Model,
  HasMany,
  CreatedAt,
  PrimaryKey,
  BelongsTo,
  DataType,
  Default,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';

import { EmployeeModel } from './employee.model';

@Table({ modelName: 'departments' })
export class DepartmentModel extends Model<DepartmentModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column
  @CreatedAt
  creationDate: Date;

  @Column
  departmentInfo: string;

  @ForeignKey(() => EmployeeModel)
  @AllowNull(true)
  @Column
  headId: string;

  @BelongsTo(() => EmployeeModel, {
    onDelete: 'SET NULL',
    foreignKey: 'headId',
  })
  head: EmployeeModel;

  @HasMany(() => EmployeeModel, {
    onDelete: 'RESTRICT',
    foreignKey: 'departmentId',
  })
  employees: EmployeeModel[];
}
