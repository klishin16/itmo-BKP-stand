import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export interface IMovie {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  await app.listen(3000);
}
bootstrap();
