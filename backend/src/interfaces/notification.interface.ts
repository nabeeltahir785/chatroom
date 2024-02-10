import { Document } from 'mongoose';

export interface Notification extends Document {
    user: string;
    type: string;
    message: string;
    timestamp: Date;
    read: boolean;
}
