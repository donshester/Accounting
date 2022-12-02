import { Column, Table, Model} from "sequelize-typescript";


@Table
export class DepartmentModel extends Model{
    @Column
    title: string;

    @Column
    headId: number;

    @Column
    createdDate: Date;

    @Column
    departmentInfo: string;
}