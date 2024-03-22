import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const errorMessages = errors.map((error) => {
          const constraints = Object.values(error.constraints);

          return `Property ${error.property} - ${constraints.join(', ')}`;
        });

        return new BadRequestException({
          statusCode: 400,
          message: errorMessages,
          error: 'Bad Request',
        });
      },
    }),
  );
  await app.listen(8080);
}
bootstrap();
