import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigModule } from '@nestjs/config';
import postgresConfig from '../config/postgres.config';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [postgresConfig] })],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
