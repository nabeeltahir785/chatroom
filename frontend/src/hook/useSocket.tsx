import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

const SERVER_URL = 'ws://localhost:3001';

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const socketIo = io(SERVER_URL, {
            auth: {
                token: localStorage.getItem("token"),
            },
        });
        setSocket(socketIo);

        socketIo.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        socketIo.on('privateMessage', (message: string) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            socketIo.disconnect();
        };
    }, []);

    const sendMessage = (message: string,toUserId:string) => {
        if (socket) {
            socket.emit('sendPrivateMessage', { message, toUserId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
        }
    };

    return { sendMessage, messages };
};
