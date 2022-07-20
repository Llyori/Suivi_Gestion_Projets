import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebModule } from './application/modules/web/web.module';
import { AuthModule } from './domain/module/auth/auth.module';
import { dashboardModule } from './domain/module/dashboard/dashboard.module';
import { UserModule } from './domain/module/user/user.module';
import configFunction from './infrastructure/config/config';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({

  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [configFunction],
    }),
    WebModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    dashboardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
