import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DepartmentEntity } from '../department/department.enitity';

@Entity('employees')
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
  })
  firstName: string;

  @Column({
    type: 'varchar',
  })
  surname: string;

  @Column({
    type: 'text',
  })
  post: string;

  @CreateDateColumn()
  creationDate: Date;

  @OneToOne(
    () => DepartmentEntity,
    (department: DepartmentEntity) => department.headEmployee,
    { nullable: true },
  )
  headOf: DepartmentEntity;

  @ManyToOne(() => DepartmentEntity, (department) => department.employees, {
    cascade: true,
  })
  departmentId: DepartmentEntity;
}
