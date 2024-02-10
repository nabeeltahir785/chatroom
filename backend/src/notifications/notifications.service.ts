import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from '../interfaces/notification.interface';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel('Notification') private readonly notificationModel: Model<Notification>,
    ) {}

    async createNotification(notificationData): Promise<Notification> {
        const notification = new this.notificationModel(notificationData);
        return notification.save();
    }

    async getUserNotifications(userId: string): Promise<Notification[]> {
        return this.notificationModel.find({ user: userId }).exec();
    }
}
