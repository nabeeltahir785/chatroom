import React, { useState, useEffect } from 'react';

const ChatComponent = ({ user, recipient }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Fetch messages between user and recipient from backend
        // Update messages state
        // Example:
        // const fetchedMessages = fetchMessages(user, recipient);
        // setMessages(fetchedMessages);
    }, [user, recipient]);

    const sendMessage = () => {
        // Send message to backend
        // Update UI
        setMessages([...messages, { sender: user, recipient, text: newMessage }]);
        setNewMessage('');
    };

    return (
        <div>
            <h2>Chat with {recipient}</h2>
            <div style={{ height: '300px', overflowY: 'scroll' }}>
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.sender}:</strong> {message.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatComponent;
