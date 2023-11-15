import React from 'react';

const Chatbox = ({ selectedItem, messages, senderUserId, currentMessage, onMessageChange, onSendMessage, onCloseChatbox }) => {
  return (
    <div className="chatbox p-4 bg-white rounded shadow-lg m-2">
      <h2 className="text-lg font-semibold">{selectedItem.name} Chat</h2>

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
        className="mt-4 p-2 border border-gray-300 rounded"
        value={currentMessage}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
  );
};

export default Chatbox;
