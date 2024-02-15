import { DataSource, DataSourceOptions } from 'typeorm'
import * as dotenv from 'dotenv';
import * as process from 'process'
import { SeederOptions } from 'typeorm-extension'

dotenv.config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT!,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],

  seeds: ['dist/db/seeds/**/*.js'],
  seedTracking: false,
  factories: ['dist/db/factories/**/*.js'],
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource