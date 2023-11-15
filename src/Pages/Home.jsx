import React, { useEffect, useState } from "react";

const Home = () => {
  const [itemsList, setItemsList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [chatboxVisible, setChatboxVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [bidAmounts, setBidAmounts] = useState({});
  const senderUserId = localStorage.getItem('id');

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        // Get all the products
        const response = await fetch('http://localhost:5000/api/items', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (response.ok) {
          const data = await response.json();

          if (senderUserId) {
            // Filter items based on the condition
            const filteredItems = data.items?.filter(el => el.user !== senderUserId) || [];
            // Update the state with the filtered items
            setItemsList(filteredItems);

            // Initialize bid amounts state
            const initialBidAmounts = {};
            filteredItems.forEach(item => {
              initialBidAmounts[item._id] = '';
            });
            setBidAmounts(initialBidAmounts);
          } else {
            // If there is no user, set itemsList and bidAmounts directly
            setItemsList(data.items || []); // Ensure data.items exists or default to an empty array

            // Initialize bid amounts state
            const initialBidAmounts = {};
            data.items.forEach(item => {
              initialBidAmounts[item._id] = '';
            });
            setBidAmounts(initialBidAmounts);
          }
        } else {
          console.error('Error fetching items:', response.statusText);
          // You might want to set an error state or display a user-friendly error message
        }
      } catch (error) {
        console.error('API call error:', error.message);
        // You might want to set an error state or display a user-friendly error message
      }
    };

    fetchAllItems();
  }, [senderUserId]);

  const openChatbox = (item) => {
    setSelectedItem(item);
    setChatboxVisible(true);
  };

  const closeChatbox = () => {
    setSelectedItem(null);
    setChatboxVisible(false);
  };

  const sendMessage = () => {
    if (currentMessage.trim() === '') {
      return; // Ignore empty messages
    }

    const newMessage = {
      text: currentMessage,
      sender: senderUserId,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setCurrentMessage('');
  };

  const handleBid = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/items/${itemId}/bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          userId: localStorage.getItem('id'),
          bidAmount: bidAmounts[itemId],
        }),
      });

      if (response.ok) {
        // Bid placed successfully
        console.log('Bid placed successfully!');

        // Update the itemsList state with the new data
        const updatedItemsList = itemsList.map(item => {
          if (item._id === itemId) {
            return {
              ...item,
              highestBidAmount: parseFloat(bidAmounts[itemId]),
              highestBidder: localStorage.getItem('id'),
            };
          }
          return item;
        });

        setItemsList(updatedItemsList);

        alert('Bid placed successfully!');
      } else {
        // Handle bid placement error
        console.error('Error placing bid:', response.statusText);
      }
    } catch (error) {
      // Handle other errors
      console.error('API call error:', error.message);
    }
  };

  return (
    <div>
      {itemsList.map((item) => (
        <div key={item._id}>
          {item.biddingStatus === 'open' ? (
            <p style={{ color: 'green', fontWeight: '700' }}>Bidding is Open</p>
          ) : (
            <p style={{ color: 'red', fontWeight: '800' }}>Bidding is Closed</p>
          )}
          {/* Display item details here */}
          <p>{item.name}</p>
          <p>{item.description}</p>
          <p>{item.price}</p>
          <p>Highest bid:{item.highestBidAmount}</p>
          <p>Highest bidder: {item.highestBidder}</p>

          {/* Add a button to open the chatbox */}
          <button onClick={() => openChatbox(item)}>Open Chat</button>

          {/* Add input for placing bids */}
          {senderUserId && item.biddingStatus === 'open' && (
            <div>
              <input
                type="number"
                value={bidAmounts[item._id]}
                onChange={(e) => setBidAmounts({ ...bidAmounts, [item._id]: e.target.value })}
                placeholder="Enter bid amount"
              />
              <button onClick={() => handleBid(item._id)}>Place Bid</button>
            </div>
          )}
        </div>
      ))}

      {/* Chatbox */}
      {chatboxVisible && selectedItem && (
        <div className="chatbox">
          <h2>{selectedItem.name} Chat</h2>

          {/* Display chat messages */}
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className={message.sender === senderUserId ? 'sent' : 'received'}>
                <p>{message.text}</p>
                <small>{message.timestamp}</small>
              </div>
            ))}
          </div>

          {/* Input for typing messages */}
          <textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>

          {/* Add a button to close the chatbox */}
          <button onClick={closeChatbox}>Close Chat</button>
        </div>
      )}
    </div>
  );
};

export default Home;
