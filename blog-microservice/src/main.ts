/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import errorHandler from './middlewares/errorhandler';
import config from './config/config';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
      const es = {}
      errors.forEach(error => {
        es[error.property] = error.constraints
      })
      throw new BadRequestException(es)
    }
  }));
  app.use(errorHandler)
  await app.listen(config().port);
}
bootstrap();
