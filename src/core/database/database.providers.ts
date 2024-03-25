import { SEQUELIZE } from '../constants';
import { SequelizeConfigService } from '../config/sequelizeConfig.service';
import { Sequelize } from 'sequelize-typescript';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';

export const databaseProviders: Provider[] = [
  {
    provide: SEQUELIZE,
    useFactory: async (sequelizeConfigService: SequelizeConfigService) => {
      const config = sequelizeConfigService.createSequelizeOptions();
      const sequelize = new Sequelize(config);
      await sequelize.sync();
      return sequelize;
    },
    inject: [SequelizeConfigService],
  },
  SequelizeConfigService,
];
