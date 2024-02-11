import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsService } from './rooms/rooms.service';
import { RoomSchema, MessageSchema } from '../schemas';
import {ChatGateway} from "./chat.gateway";
import {ChatService} from "./chat.service";
import {JwtService} from "@nestjs/jwt";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Room', schema: RoomSchema },
            { name: 'Message', schema: MessageSchema },
        ]),
    ],
    providers: [RoomsService, ChatGateway,ChatService, JwtService],
    exports: [RoomsService, MongooseModule]
})
export class ChatModule {}
