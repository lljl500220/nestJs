import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(111);
    return this.appService.getHello();
  }

  @Post('/setHello')
  setHello(): string {
    return 'set hello';
  }
}
