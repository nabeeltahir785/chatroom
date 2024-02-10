import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from '../../interfaces/room.interface';
import { Message } from '../../interfaces/message.interface';

@Injectable()
export class RoomsService {
    constructor(
        @InjectModel('Room') private readonly roomModel: Model<Room>,
        @InjectModel('Message') private readonly messageModel: Model<Message>,
    ) {}

    async getRecentMessages(roomId: string): Promise<any> {
        const room = await this.roomModel.findById(roomId).populate('messages');
        return room.messages.slice(-10); // Returns the last 10 messages
    }

    async saveMessage(messageData): Promise<Message> {
        const message = new this.messageModel(messageData);
        await message.save();

        // Push message to room's messages array
        await this.roomModel.findByIdAndUpdate(messageData.room, { $push: { messages: message._id } });

        return message;
    }
}
