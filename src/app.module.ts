import { Module } from '@nestjs/common';  // Module decorator from @nestjs/common
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';  // Exported from appcontroller
import { AppService } from './app.service';  // This will have the database logic
import { SQLConnection } from './db-config';

@Module({
  imports: [TypeOrmModule.forRoot(SQLConnection)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
