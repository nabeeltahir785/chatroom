import { Injectable } from '@nestjs/common';

interface Message {
    sender: string;
    content: string;
    timestamp: Date;
}

@Injectable()
export class ChatService {
    private roomHistories: Map<string, Message[]> = new Map();
    private userSocketMap: Map<string, string> = new Map(); // Maps userId to socketId



    constructor() {}

    registerUserSocket(userId: string, socketId: string): void {
        this.userSocketMap.set(userId, socketId);
    }

    getUserSocketId(userId: string): string | undefined {
        return this.userSocketMap.get(userId);
    }
    storeMessage(room: string, content: string, sender: string): void {
        const timestamp = new Date();
        const message: Message = { sender, content, timestamp };

        if (!this.roomHistories.has(room)) {
            this.roomHistories.set(room, [message]);
        } else {
            const messages = this.roomHistories.get(room);
            messages.push(message);
            // Keep the history capped at the last 10 messages
            if (messages.length > 10) {
                messages.shift(); // Remove the oldest message if over limit
            }
        }
    }


    getRoomHistory(room: string): Message[] {
        return this.roomHistories.get(room) || [];
    }
}
