import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './schemas';
import {ChatModule} from "./chat/chat.module";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import {ChatGateway} from "./chat/chat.gateway";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    ChatModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}