import { Body, Controller, Get, Post, Req} from '@nestjs/common';  // We get get, post, put, delete, Controller from @nestjs/common
import { brotliDecompressSync } from 'zlib';
import { AppService } from './app.service';  // Injectable logic from app service
import fs from 'fs';


@Controller('user-data')
export class AppController {
  constructor(private readonly appService: AppService) {}
  someData: Object[] = [];

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  @Post()
  viewData(@Body() body): any {
    if (body) {
      console.log(body)
    }
    return `User data added successfully`
  }
}
