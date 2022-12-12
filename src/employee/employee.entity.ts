import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DepartmentEntity } from "../department/department.entity";

@Entity('employees')
export class EmployeeEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type:'varchar'
    })
    firstName: string

    @Column({
        type:'varchar'
    })
    surname: string

    @Column({
        type:'text'
    })
    post: string

    @CreateDateColumn ({
    })
    creationDate: Date;

    // @Column({
    //     type: 'boolean'
    // })
    // IsHead: boolean;
    @ManyToOne(() => DepartmentEntity, (department) => department.employees, {
        cascade: true
    })
    departmentId: DepartmentEntity;
}