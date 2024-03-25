import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { EnumConfig } from './enumConfig/enumConfig';
import { DepartmentModel } from '../../department/models/department.model';
import { Options } from 'sequelize';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const { dialect, logging, host, port, username, password, database } =
      this.configService.get<Options>(EnumConfig.DATABASE);
    return {
      dialect,
      logging,
      host,
      port,
      username,
      password,
      database,
      models: [DepartmentModel],
    };
  }
}
