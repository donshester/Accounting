import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from "../constants";
import { databaseConfig } from './database.config';
import { DepartmentModel } from "../../department/models/department.model";
import { EmployeeModel } from "../../employee/models/employee.model";

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV as any) {
            case DEVELOPMENT:
                config = databaseConfig.development;
                break;
            case TEST:
                config = databaseConfig.test;
                break;
            case PRODUCTION:
                config = databaseConfig.production;
                break;
            default:
                config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([DepartmentModel, EmployeeModel]);
        await sequelize.sync();
        return sequelize;
    },
}];