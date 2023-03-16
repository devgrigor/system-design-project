import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
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
