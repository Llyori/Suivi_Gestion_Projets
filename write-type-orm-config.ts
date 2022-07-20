/* eslint-disable prettier/prettier */
import fs = require('fs');
import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import configFunction from './src/infrastructure/config/config';
config();
const getTypeOrmConfig = (): TypeOrmModuleOptions & { seeds: string[] } => {
  const config = configFunction()['database'];
  return {
    url: config['url'],
    type: config['type'],
    database: config['name'],
    username: config['username'],
    password: config['password'],
    host: config['host'],
    port: config['port'],
    ssl: config['secure'],
    seeds: ['seeds/**/*{.ts,.js}'],
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['migration/*.js'],
    cli: {
      migrationsDir: 'migration',
    },
    extra: {
      encrypt: true, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  };
};
fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(getTypeOrmConfig(), null, 2), // last parameter can be changed based on how you want the file indented
);
