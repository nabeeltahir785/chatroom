import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsService } from './rooms/rooms.service';
import { RoomSchema, MessageSchema } from '../schemas';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Room', schema: RoomSchema },
            { name: 'Message', schema: MessageSchema },
        ]),
    ],
    providers: [RoomsService],
    exports: [RoomsService, MongooseModule]
})
export class ChatModule {}
