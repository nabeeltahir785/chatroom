import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect,ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { RoomsService } from './rooms/rooms.service';
import { JwtService } from '@nestjs/jwt';
@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly chatService: ChatService,private readonly roomsService: RoomsService, private readonly jwtService: JwtService) {}
    @WebSocketServer() server: Server;

    afterInit(server: Server) {
        console.log('WebSocket initialized');
    }

    async handleConnection(client: any, ...args: any[]) {
        const token = client.handshake.auth.token;
        console.log(token)
        if (!token) {
            client.disconnect();
            console.log('No token provided, disconnecting client');
            return;
        }

        try {
            const user = await this.validateToken(token);
            if (!user) {
                client.disconnect();
                console.log('Invalid token, disconnecting client');
                return;
            }
            // Optionally, associate the user with the client socket for further use
            client.data.user = user;
            console.log(`Client connected with valid token: ${client.id}`);
        } catch (error) {
            client.disconnect();
            console.log(`Token validation error: ${error.message}`);
        }
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: any) {
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
        console.log("MESSAGE SENt",message)
        const recipientSocketId = this.chatService.getUserSocketId(message.toUserId);
        this.server.to(recipientSocketId).emit('privateMessage', message);
    }

    @SubscribeMessage('typing')
    handleTyping(@MessageBody() data: { room: string; user: string; isTyping: boolean }, @ConnectedSocket() client: Socket) {
        client.broadcast.to(data.room).emit('userTyping');
    }

    private async validateToken(token: string): Promise<any> {
        try {
            const decoded = this.jwtService.verify(token);
            console.log(decoded)
            return decoded;
        } catch (error) {
            console.log(`Token validation failed: ${error.message}`);
            console.error('Error validating token:', error);
            if (error.name === 'TokenExpiredError') {
                console.error('Token has expired');
            } else if (error.name === 'JsonWebTokenError') {
                console.error('JWT error:', error.message);
            } else {
                console.error('Validation error:', error.message);
            }
            return null;
        }
    }
}
