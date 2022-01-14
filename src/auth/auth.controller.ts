import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('/sign-up')
    async SignUp(@Req() request){
        return await this.authService.signUp(request);
    }

    @Post('/sign-in')
    async SignIn(@Req() request){
        return await this.authService.signIn(request);
    }
}

export {AuthController};