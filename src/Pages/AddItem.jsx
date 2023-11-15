import { useEffect, useState } from "react";

const AddItem = () => {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [userItems, setUserItems] = useState([]);

    const handleAddItem = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('id');
    
        try {
          const response = await fetch('http://localhost:5000/api/items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,
            },
            body: JSON.stringify({
              name: itemName,
              description: itemDescription,
              price: itemPrice,
              user: userName,
            }),
          });
    
          if (response.ok) {
            console.log('Item added successfully!');
            alert("Item added successfully!");
          } else {
            console.error('Error adding item:', response.statusText);
          }
        } catch (error) {
          console.error('API call error:', error.message);
        }
      };

      const fetchUserItems = async () => {
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("id");
    
          try {
            const response = await fetch(`http://localhost:5000/api/items/${userId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              setUserItems(data.items);
            } else {
              console.error("Error fetching user items:", response.statusText);
            }
          } catch (error) {
            console.error("API call error:", error.message);
          }
        };
    
      useEffect(() => {
    
        fetchUserItems();
      }, [userItems]);

      const handleCloseBidding = async (itemId) => {
        const token = localStorage.getItem('token');
    
        try {
          const response = await fetch(`http://localhost:5000/api/items/${itemId}/close-bidding`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,
            },
          });
    
          if (response.ok) {
            // Bidding closed successfully
            console.log('Bidding closed successfully!');
            // You may want to refresh the user items after closing bidding
            fetchUserItems();
          } else {
            // Handle error
            console.error('Error closing bidding:', response.statusText);
          }
        } catch (error) {
          console.error('API call error:', error.message);
        }
      };


    return (
        <div>
            <h2>Add Item</h2>
            <form>
                <label>
                    Name:
                    <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Price:
                    <input
                        type="number"
                        value={itemPrice}
                        onChange={(e) => setItemPrice(e.target.value)}
                    />
                </label>
                <br />
                <button type="button" onClick={handleAddItem}>
                    Add Item
                </button>
            </form>


            <h2>Your Items</h2>
            <ul>
                {userItems.map((item) => (
                    <li key={item._id}>
                        <strong>Name:</strong> {item.name}, <strong>Description:</strong>{" "}
                        {item.description}, <strong>Price:</strong> {item.price}

                        {/* Display bidding details */}
                        <p>Highest Bid: {item.highestBidAmount}</p>
                        <p>Highest Bidder: {item.highestBidder || 'None'}</p>
                        <p>Bidding Status: {item.biddingStatus}</p>

                        {/* Add a button to close bidding (if it's open) */}
                        {item.biddingStatus === 'open' && (
                            <button type="button" onClick={() => handleCloseBidding(item._id)}>
                                Close Bidding
                            </button>
                        )}
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default AddItem;
