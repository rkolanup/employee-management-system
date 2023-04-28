/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const DataSourceConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true, // set to false on PROD   
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'], 
};

const dataSource = new DataSource(DataSourceConfig);
export default dataSource;