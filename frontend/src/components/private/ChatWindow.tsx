import React from 'react';
import MessageInput from './MessageInput';
import { useSocket } from "../../hook/useSocket";
const ChatWindow: React.FC = () => {
    const { sendMessage, messages } = useSocket();
    return (
        <div className="w-96 h-96 border border-gray-300 rounded flex flex-col">
        <div className="flex-1 overflow-y-auto">
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            </div>
            <MessageInput onSendMessage={sendMessage} />
            </div>
    );
};

export default ChatWindow;