import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
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
    PostsModule,
    MongooseModule.forRoot(config().database.host)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
