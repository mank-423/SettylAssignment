import React, { useEffect, useState } from "react";
import ItemCard from "../Component/ItemCard";
import Chatbox from "../Component/Chatbox";

const Home = () => {
  const [itemsList, setItemsList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentMessages, setCurrentMessages] = useState({});
  const [bidAmounts, setBidAmounts] = useState({});
  const senderUserId = localStorage.getItem('id');

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        // Get all the products
        const response = await fetch('https://settylapi.onrender.com/api/items', {
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
    setSelectedItems((prev) => [...prev, item]);
    setCurrentMessages((prev) => ({ ...prev, [item._id]: '' }));
    // setChatboxVisible((prev) => ({ ...prev, [item._id]: true }));
  };

  const closeChatbox = (item) => {
    setSelectedItems((prev) => prev.filter((selectedItem) => selectedItem._id !== item._id));
    setCurrentMessages((prev) => {
      const updatedMessages = { ...prev };
      delete updatedMessages[item._id]; // Remove currentMessage for the closed chatbox
      return updatedMessages;
    });
    // setChatboxVisible((prev) => ({ ...prev, [item._id]: false }));
  };

  const sendMessage = (itemId) => {
    const currentMessage = currentMessages[itemId];
    if (currentMessage.trim() === '') {
      return; // Ignore empty messages
    }

    const newMessage = {
      text: currentMessage,
      sender: senderUserId,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setCurrentMessages((prev) => ({ ...prev, [itemId]: '' })); // Clear currentMessage after sending the message
  };

  const handleBid = async (itemId) => {
    try {
      const response = await fetch(`https://settylapi.onrender.com/api/items/${itemId}/bid`, {
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
    <div className="flex bg-gray-100">
      <div className="flex-1">
        {/* Display ItemCards */}
        {itemsList.map((item) => (
          <div key={item._id} className="flex item-container">
            {/* ItemCard */}
            <div className="flex-1">
              <ItemCard
                item={item}
                openChatbox={openChatbox}
                handleBid={handleBid}
                bidAmount={bidAmounts}
                setBidAmount={setBidAmounts}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1">
        {/* Display Chatboxes */}
        {selectedItems.map((selectedItem) => (
          <Chatbox
            key={selectedItem._id}
            selectedItem={selectedItem}
            messages={messages}
            senderUserId={senderUserId}
            currentMessage={currentMessages[selectedItem._id] || ''}
            onMessageChange={(newMessage) => setCurrentMessages((prev) => ({ ...prev, [selectedItem._id]: newMessage }))}
            onSendMessage={() => sendMessage(selectedItem._id)}
            onCloseChatbox={() => closeChatbox(selectedItem)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
