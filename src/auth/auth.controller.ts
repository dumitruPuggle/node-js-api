import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import {User} from '../db-model/User'
// import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup'
const jwt = require('jsonwebtoken');

@Controller('auth')
class AuthController {
    @Post('/sign-up')
    async SignIn(@Req() request: Request): Promise<any>{
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
            const res = await userSchema.validate(request.body)
            const user = new User();
            user.firstName = "Timber";
            user.lastName = "Saw";
            await user.save();
            return res
        }catch (err){
            return "Your body content does not match the schema."
        }
    }
}

export {AuthController};