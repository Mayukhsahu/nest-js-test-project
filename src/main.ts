import { NestFactory } from '@nestjs/core'; // A core module by nest
import { AppModule } from './app.module';  // exported from app module

async function bootstrap() {  // A function that bootstraps nest js
  const app = await NestFactory.create(AppModule);  // Creates an instance of nest application
  app.enableCors()
  await app.listen(3000);  // Listens to the server at given port.
}
bootstrap();
