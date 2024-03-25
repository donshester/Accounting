import {
  Column,
  Table,
  Model,
  HasMany,
  CreatedAt,
  HasOne,
  AutoIncrement,
  Unique,
  PrimaryKey,
  BelongsTo,
  DataType,
  Default,
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

  @Unique
  @Column({
    allowNull: false,
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
