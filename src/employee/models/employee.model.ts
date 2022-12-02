import { Column, Table, Model} from "sequelize-typescript";

@Table
export class EmployeeModel extends Model{
    @Column
    firstName: string

    @Column
    surname: string

    @Column
    post: string

    @Column
    departmentId: number;
}