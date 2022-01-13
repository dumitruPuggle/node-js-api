import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { config } from './orm.config';

@Module({
  imports: [TypeOrmModule.forRoot(config)],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
