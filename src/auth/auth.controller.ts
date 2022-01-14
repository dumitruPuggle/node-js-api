import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('/sign-up')
    async SignIn(@Req() request): Promise<any>{
        return await this.authService.signUp(request);
    }
}

export {AuthController};