import { registerAs } from '@nestjs/config';
import { EnumConfig } from './enumConfig/enumConfig';
import { Dialect, Options } from 'sequelize';

export default registerAs(EnumConfig.DATABASE, (): Options => {
  return {
    dialect: <Dialect>process.env.DB_DIALECT || 'postgres',
    logging: process.env.SQL_LOGGING === 'true' ? console.log : false,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };
});
