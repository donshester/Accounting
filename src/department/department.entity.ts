import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeEntity } from "../employee/employee.entity";

@Entity('departments')
export class DepartmentEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar'
    })
    title: string;

    @Column({

    })
    headId: number;

    @CreateDateColumn ({
    })
    creationDate: Date;

    @Column({
        type: 'text'
    })
    departmentInfo: string;

    @OneToMany(() => EmployeeEntity, (employee) => employee.departmentId)
    employees: EmployeeEntity[];
}