import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import {UserService} from "../user/user.service";
import {LocalStrategy} from "./local.strategy";
import {TOKEN_EXPIRE_TIME} from "../constant";
import { ConfigModule, ConfigService } from '@nestjs/config';
@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
      // JwtModule.register({
      //   secret:"secretKey",
      //   signOptions: { expiresIn: TOKEN_EXPIRE_TIME }
      // })
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => {
    //     const secret = configService.get<string>('JWT_SECRET_KEY');
    //     console.log('JWT Secret Key:', secret); // Debug: Check if secret is null/undefined
    //     return {
    //       secret,
    //       signOptions: { expiresIn: '60s' }, // Adjust as necessary
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: TOKEN_EXPIRE_TIME },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, UserService, LocalStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}