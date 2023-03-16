"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
exports.dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'asdasd',
    database: 'test',
    entities: ['./src/entity/*.js'],
    logging: true,
    synchronize: true,
});
