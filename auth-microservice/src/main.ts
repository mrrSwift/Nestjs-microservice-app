import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  Transport } from '@nestjs/microservices';
import errorHandler from './middlewares/errorhandler';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import config from './config/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3000,
    },
  });
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
      const es = {}
      errors.forEach(error =>{
        
        es[error.property]=error.constraints 
        
      })
      throw new BadRequestException(es)
    }
  }));
  app.use(errorHandler)

  await app.startAllMicroservices();
  await app.listen(config().port);
}
bootstrap();
