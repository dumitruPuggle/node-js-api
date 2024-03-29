import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/profile')
  getProfile(@Req() request){
    return this.appService.getProfile(request);
  }
}
export {AppController}