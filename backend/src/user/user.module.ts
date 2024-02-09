import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import {UserSchema} from "../schemas/user.schema"
import {UserRepository} from "./user.repository";
@Module({
  providers: [UserService, UserRepository],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  exports: [UserService, UserRepository]
})
export class UserModule {}
