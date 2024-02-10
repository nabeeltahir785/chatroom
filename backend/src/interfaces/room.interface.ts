import { Document } from 'mongoose';
import { Message } from './message.interface';

export interface Room extends Document {
    name: string;
    messages: Message[] | string[];
}