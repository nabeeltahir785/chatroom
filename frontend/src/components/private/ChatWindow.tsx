import React from 'react';
import MessageInput from './MessageInput';

const ChatWindow: React.FC = () => {
    return (
        <div className="w-96 h-96 border border-gray-300 rounded flex flex-col">
        <div className="flex-1 overflow-y-auto">
            {/* Render messages here */}
            </div>
            <MessageInput />
            </div>
    );
};

export default ChatWindow;