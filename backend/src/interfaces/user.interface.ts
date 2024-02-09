import { Document } from 'mongoose';
import {Notification} from "./notification.interface";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    notifications: Notification[] | string[];
}