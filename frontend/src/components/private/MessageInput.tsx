import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
interface MessageInputProps {
    onSendMessage: (message: string,toUserId:string) => void;
}

interface ChatParams {
    [key: string]: string | undefined;
    toUserId: string;
}
const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState<string>('');
    const { toUserId } = useParams<ChatParams>();
    const sendMessage = () => {
        if (message.trim() && toUserId) {
            onSendMessage(message, toUserId);
        }
        setMessage('');
    };
    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };



    return (
        <div className="flex justify-between p-2 bg-gray-100">
            <input
                type="text"
                className="flex-1 mr-2 p-2 border border-gray-300 rounded"
                placeholder="Type a message..."
                value={message}
                onChange={handleMessageChange}
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={sendMessage}
            >
                Send
            </button>
        </div>
    );
};

export default MessageInput;