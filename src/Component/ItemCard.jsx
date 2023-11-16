const ItemCard = ({ item, openChatbox, handleBid, bidAmount, setBidAmount }) => {

  const user = localStorage.getItem('id');

  return (
    <div className="bg-black text-white shadow-md rounded p-6 m-4">
      <div>
        {item.biddingStatus === 'open' ? (
          <p className="text-green-700 font-bold">Bidding is Open</p>
        ) : (
          <p className="text-red-800 font-bold">Bidding is Closed</p>
        )}
      </div>
      {/* Display item details here */}
      <p className="text-xl font-bold mb-2">{item.name}</p>
      <p className="text-gray-300 mb-4">{item.description}</p>
      <p className="text-lg font-bold mb-2">₹~{item.price}</p>
      <p className="text-gray-300">Highest bid: ₹{item.highestBidAmount}</p>
      <p className="text-gray-300">Highest bidder: {item.highestBidder}</p>



      {/* Add input for placing bids */}
      {bidAmount && item.biddingStatus === 'open' && user !== null && (
        <div>
          {/* Add a button to open the chatbox */}
          <button
            className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded mt-4"
            onClick={() => openChatbox(item)}
          >
            Open Chat
          </button>

          <div className="mt-4">
            <input
              className="border rounded py-2 px-3 text-black"
              type="number"
              value={bidAmount[item._id] || ''}
              onChange={(e) => setBidAmount({ ...bidAmount, [item._id]: e.target.value })}
              placeholder="Enter bid amount"
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => handleBid(item._id)}
            >
              Place Bid
            </button>
          </div>
        </div>
      )}

      {user === null && (
        <p className="font-bold flex justify-center items-center py-3 text-red-600">
          Login to use the bidding and chat feature
        </p>
      )}
    </div>
  );
};

export default ItemCard;
