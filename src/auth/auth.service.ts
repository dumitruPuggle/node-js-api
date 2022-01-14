import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import * as Yup from 'yup'
import { User } from 'src/db-model/User.entity';
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

@Injectable()
export class AuthService {
  async signUp(@Req() request: Request){
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
    })
    async function checkUser(data: {email: string}){
      const res = await User.findOne({ where: { email: data.email}})
      return res
    }
    try{
        const data = await userSchema.validate(request.body)
        if(!await checkUser(data)){
          await User.insert({
            ...data,
            pwd: bcrypt.hashSync(data.pwd, bcrypt.genSaltSync(10))
          })
          return {
            "msg": "Success the user has been created successfully."
          }
        }else{
          throw new Error()
        }
    }catch (err){
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An unexpected error has occurred, make sure your body content is respecting all the schema requirements. Or probably the email address is already in use.',
      }, HttpStatus.FORBIDDEN);
    }
  }
  async signIn(@Req() request: Request){
    const loginSchema = Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      pwd: Yup.string()
      .required('No password provided.') 
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    })
    try{
      const data = loginSchema.validate(request?.body)
      const clientEmail = (await data).email
      const clientPwd = (await data).pwd
      const res = await User.findOne({ where: {email: clientEmail}})
      const access = await bcrypt.compare(clientPwd, res.pwd)
      if(access){
        return {
          msg: "Success",
          accessToken: jwt.sign({data: {id: res.id}}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }),
          refreshToken: jwt.sign({data: {id: res.id}}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
        }
      }else{
        throw new Error()
      }
    }catch(err){
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An unexpected error has occurred, make sure your body content is respecting all the schema requirements. Or your user credentials are not correct.',
      }, HttpStatus.FORBIDDEN);
    }
  }
}
