import React from 'react';

const Chatbox = ({ selectedItem, messages, senderUserId, currentMessage, onMessageChange, onSendMessage, onCloseChatbox }) => {
    return (
        <div className="chatbox p-4 bg-black  rounded shadow-lg m-2">
            <h2 className="text-lg font-semibold text-white~">{selectedItem.name} Chat</h2>

            {/* Display chat messages */}
            <div className="messages-container mt-4">
                {messages.map((message, index) => (
                    <div key={index} className={`mb-2 ${message.sender === senderUserId ? 'text-green-600' : 'text-blue-600'}`}>
                        <p>{message.text}</p>
                        <small className="text-xs text-gray-500">{message.timestamp}</small>
                    </div>
                ))}
            </div>

            {/* Input for typing messages */}
            <textarea
                className="mt-4 p-2 border border-white rounded"
                value={currentMessage}
                onChange={(e) => onMessageChange(e.target.value)}
                placeholder="Type your message..."
            />

            <div className="flex gap-2">
                <button
                    className="mt-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-300"
                    onClick={onSendMessage}
                >
                    Send
                </button>

                {/* Add a button to close the chatbox */}
                <button
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={onCloseChatbox}
                >
                    Close Chat
                </button>
            </div>
        </div>
    );
};

export default Chatbox;
