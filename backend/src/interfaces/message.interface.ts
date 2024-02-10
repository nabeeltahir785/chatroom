import { Document } from 'mongoose';

export interface Message extends Document {
    room: string;
    sender: string;
    content: string;
    timestamp: Date;
    private: boolean;
    recipient?: string;
}