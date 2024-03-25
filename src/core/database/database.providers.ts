import { SEQUELIZE } from '../constants';
import { SequelizeConfigService } from '../config/sequelizeConfig.service';
import { Sequelize } from 'sequelize-typescript';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { DepartmentModel } from '../models/department.model';
import { EmployeeModel } from '../models/employee.model';
import * as path from "path";

export const databaseProviders: Provider[] = [
  {
    provide: SEQUELIZE,
    useFactory: async (sequelizeConfigService: SequelizeConfigService) => {
      const config = sequelizeConfigService.createSequelizeOptions();
      const sequelize = new Sequelize(config);
      await sequelize.sync({ force: true });
      return sequelize;
    },
    inject: [SequelizeConfigService],
  },
  SequelizeConfigService,
];
