import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from '../db/data-source';
import { EmployeeModule } from './employee/employee.module';
import { ProjectModule } from './project/project.module';
import { DepartmentModule } from './department/department.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(DataSourceConfig),
    EmployeeModule,
    ProjectModule,
    DepartmentModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
