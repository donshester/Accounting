import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DepartmentModule} from "./department/department.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {SequelizeConfigService} from "./config/sequelizeConfig.service";
import {databaseConfig} from "./config/configuration";
import {EmployeeModule} from "./employee/employee.module";
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    DepartmentModule,
    EmployeeModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
