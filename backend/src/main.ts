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
  const PORT = process.env.PORT || 3000;
  app.enableCors({
    origin: '*',
  });
  await app.listen(PORT);
  return PORT;
}
bootstrap().then((PORT) => console.log(`Application started on port ${PORT}`));
