import { Body, Controller, Get, Post } from '@nestjs/common'; // We get get, post, put, delete, Controller from @nestjs/common
import { AppService } from './app.service';

@Controller('user-data')
export class AppController {
  someData: any[] = [];
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  @Post()
  viewData(@Body() body): any {
    if (body) {
      console.log(body);
    }
    return `User data added successfully`;
  }
}
