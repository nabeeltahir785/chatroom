import { WebSocketGateway, SubscribeMessage, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { RoomsService } from './rooms/rooms.service';
@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway {
    @WebSocketServer() server: Server;
    constructor(private readonly chatService: ChatService,private readonly roomsService: RoomsService) {}
    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);

        client.on('joinRoom', (room) => {
            const message = `${client.id} has joined ${room}`;
            this.server.to(room).emit('notification', message);
            client.join(room);
        });

        client.on('disconnect', () => {
            const message = `${client.id} has left`;
            this.server.emit('notification', message);
        });
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(@MessageBody() data: { room: string; user: string }, @ConnectedSocket() client: Socket) {
        client.join(data.room);
        const messages = await this.roomsService.getRecentMessages(data.room);
        client.emit('joinedRoom', messages);

        this.server.to(data.room).emit('notifications', `${data.user} has joined the room.`);
    }

    @SubscribeMessage('sendMessage')
    handleMessage(@MessageBody() message: { room: string; msg: string, sender: string }, @ConnectedSocket() client: Socket) {
        this.chatService.storeMessage(message.room, message.msg, message.sender);
        this.server.to(message.room).emit('newMessage', message);
    }

    @SubscribeMessage('sendPrivateMessage')
    handlePrivateMessage(@MessageBody() message: { room: string; toUserId: string; msg: string }, @ConnectedSocket() client: Socket) {
        const recipientSocketId = this.chatService.getUserSocketId(message.toUserId);
        this.server.to(recipientSocketId).emit('privateMessage', message);
    }

    @SubscribeMessage('typing')
    handleTyping(@MessageBody() data: { room: string; user: string; isTyping: boolean }, @ConnectedSocket() client: Socket) {
        client.broadcast.to(data.room).emit('userTyping', data);
    }
}
