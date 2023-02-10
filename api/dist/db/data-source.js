"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceConfig = void 0;
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
dotenv.config();
exports.DataSourceConfig = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    entities: ['dist/**/*.entity.js'],
};
const dataSource = new typeorm_1.DataSource(exports.DataSourceConfig);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map