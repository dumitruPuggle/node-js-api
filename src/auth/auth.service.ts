import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import * as Yup from 'yup'
import { User } from 'src/db-model/User.entity';

@Injectable()
export class AuthService {
  async signUp(@Req() request: Request): Promise<any>{
    const userSchema = Yup.object({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        pwd: Yup.string()
        .required('No password provided.') 
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        firstName:  Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
        lastName:  Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
        location: Yup.string()
        .min(2, 'Too Short!')
        .max(250, 'Too Long!')
        .required('Required'),
        position: Yup.string()
        .min(2, 'Too Short!')
        .max(250, 'Too Long!')
        .required('Required')
    });
    try{
        const data = await userSchema.validate(request.body)
        await User.insert(data)
        return "Success"
    }catch (err){
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Oh, it seems that your body schema is not covering all the requirements',
      }, HttpStatus.FORBIDDEN);
    }
  }
}
