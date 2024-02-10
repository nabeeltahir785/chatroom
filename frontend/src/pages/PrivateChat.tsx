import React from 'react';
import ChatWindow from '../components/private/ChatWindow';

const PrivateChat: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <ChatWindow />
        </div>
    );
};

export default PrivateChat;