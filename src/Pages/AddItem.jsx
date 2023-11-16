import React, { useEffect, useState } from "react";

const AddItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [userItems, setUserItems] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("id");

  const handleAddItem = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://settylapi.onrender.com/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          name: itemName,
          description: itemDescription,
          price: itemPrice,
          user: userName,
        }),
      });

      if (response.ok) {
        console.log("Item added successfully!");
        alert("Item added successfully!");

        // Refresh user items after adding a new item
        fetchUserItems();
      } else {
        console.error("Error adding item:", response.statusText);
      }
    } catch (error) {
      console.error("API call error:", error.message);
    }
  };

  const fetchUserItems = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    try {
      const response = await fetch(`https://settylapi.onrender.com/api/items/${userId}`, {
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

  const fetchUserTransactions = async () => {
    const userId = localStorage.getItem("id");

    try {
      const response = await fetch(`https://settylapi.onrender.com/api/transactions/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserTransactions(data.transactions);
      } else {
        console.error("Error fetching user transactions:", response.statusText);
      }
    } catch (error) {
      console.error("API call error:", error.message);
    }
  };

  useEffect(() => {
    fetchUserTransactions();
  }, []);

  useEffect(() => {
    fetchUserItems();
  }, []);

  const handleCloseBidding = async (itemId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`https://settylapi.onrender.com/api/items/${itemId}/close-bidding`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });

      if (response.ok) {
        // Bidding closed successfully
        console.log("Bidding closed successfully!");

        // Fetch user transactions after closing bidding
        fetchUserTransactions();

        // Refresh user items after closing bidding
        fetchUserItems();
      } else {
        // Handle error
        console.error("Error closing bidding:", response.statusText);
      }
    } catch (error) {
      console.error("API call error:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-200 text-black">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Add Item</h2>
      <form className="max-w-md mx-auto" onSubmit={handleAddItem}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemName">
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="itemName"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemDescription">
            Description:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="itemDescription"
            type="text"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemPrice">
            Price:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="itemPrice"
            type="number"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Item
        </button>
      </form>

      {/* Items added */}
      <h2 className="text-2xl font-bold my-8 flex justify-center">Your Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <div key={item._id} className="border p-4 rounded-md shadow-md text-white bg-black">
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className=" mb-2">{item.description}</p>
              <p className=" mb-2">${item.price}</p>

              {/* Display bidding details */}
              <p className="mb-2">
                <strong>Highest Bid:</strong> ₹{item.highestBidAmount}
              </p>
              <p className="mb-2">
                <strong>Highest Bidder:</strong> {item.highestBidder || "None"}
              </p>
              <p className="mb-2">
                <strong>Bidding Status:</strong> {item.biddingStatus}
              </p>

              {/* Add a button to close bidding (if it's open) */}
              {item.biddingStatus === "open" && (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleCloseBidding(item._id)}
                >
                  Close Bidding
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 flex justify-start font-semibold">
            - You have not added any items to bid in the auction.
            <br />
            - Add the items right now to watch the bids.
          </p>
        )}
      </div>

      {/* Transactios completed */}
      <h2 className="text-2xl font-bold my-8 flex justify-center">Your Transactions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userTransactions.length > 0 ? (
          userTransactions.map((transaction) => (
            <div key={transaction._id} className="border p-4 rounded-md shadow-md bg-black">
              <p className="text-white mb-2">
                <strong>Item Name:</strong> {transaction.itemName}
              </p>
              <p className="text-white mb-2">
                <strong>Closing Price:</strong> ₹{transaction.closingPrice}
              </p>
              <p className="text-white mb-2">
                <strong>Buyer:</strong> {transaction.buyer}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 flex justify-start font-semibold">
            - You have not completed any transactions.
          </p>
        )}
      </div>
    </div>
  );
};

export default AddItem;
