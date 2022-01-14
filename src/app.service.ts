import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { User } from './db-model/User.entity';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, Gheorghe! How are you?';
  }
  async getProfile(@Req() request){
    try{
      const user = await User.findOne({where: {
        id: request.user.id
      }})
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        position: user.position
      }
    }catch(e){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal server error',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}