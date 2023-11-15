
const ItemCard = ({ item, openChatbox, handleBid, bidAmount, setBidAmount }) => {
  return (
    <div className="bg-white shadow-md rounded p-6 m-4">
      <div>
        {item.biddingStatus === 'open' ? (
          <p className="text-green-700 font-bold">Bidding is Open</p>
        ) : (
          <p className="text-red-800 font-bold">Bidding is Closed</p>
        )}
      </div>
      {/* Display item details here */}
      <p className="text-xl font-bold mb-2">{item.name}</p>
      <p className="text-gray-700 mb-4">{item.description}</p>
      <p className="text-lg font-bold mb-2">${item.price}</p>
      <p>Highest bid: ${item.highestBidAmount}</p>
      <p>Highest bidder: {item.highestBidder}</p>

      {/* Add a button to open the chatbox */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => openChatbox(item)}
      >
        Open Chat
      </button>

      {/* Add input for placing bids */}
      {bidAmount && item.biddingStatus === 'open' && (
        <div className="mt-4">
          <input
            className="border rounded py-2 px-3"
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
      )}
    </div>
  );
};

export default ItemCard;
