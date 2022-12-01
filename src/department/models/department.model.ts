import { Column, Table, Model} from "sequelize-typescript";


@Table
export class DepartmentModel extends Model{
    @Column
    test:string;

}