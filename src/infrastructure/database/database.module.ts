import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { SQLDBType } from '../config/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          url: config.get('database.url'),
          username: config.get('database.username'),
          password: config.get('database.password'),
          database: config.get('database.name'),
          host: config.get('database.host'),
          port: config.get('database.port'),
          type: 'mssql',
          entities: ['**/*.entity.js'],
          synchronize: true,
          sslmode: 'require',
          extra: {
            encrypt: true, // for azure
            trustServerCertificate: true, // change to true for local dev / self-signed certs
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
