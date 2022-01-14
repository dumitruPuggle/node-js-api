import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {verify} from 'jsonwebtoken'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.header('Access-Token')
    verify(accessToken, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
      if (err){ 
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: 'The token is expired or invalid',
        }, HttpStatus.FORBIDDEN);
      }
      req['user'] = decoded.data
      next()
    });
  }
}