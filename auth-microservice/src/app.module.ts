import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { I18nModule } from 'nestjs-i18n';


@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'fa',
      loaderOptions: {
        path: './src/I18n',
        watch: true,
      },
    }),
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(config().database.host)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
