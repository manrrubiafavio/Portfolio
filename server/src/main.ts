import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || "3000";

async function bootstrap() {  
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://www.favio-manrrubia.com.ar',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,

  })
  await app.listen(PORT);
}
bootstrap();
