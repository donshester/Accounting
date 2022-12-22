import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EmployeeEntity } from '../employee/employee.entity';

@Entity('departments')
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  title: string;

  @OneToOne(
    () => EmployeeEntity,
    (employee: EmployeeEntity) => employee.headOf,
    {
      eager: true,
      nullable: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  headEmployee: EmployeeEntity;

  @CreateDateColumn({})
  creationDate: Date;

  @Column({
    type: 'text',
  })
  departmentInfo: string;

  @OneToMany(() => EmployeeEntity, (employee) => employee.departmentId, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  employees: EmployeeEntity[];

  @Column({
    type: 'int',
  })
  employeesCount: number;
}
