import React, { useEffect, useState } from "react";

const YourComponent = () => {
  const [itemsList, setItemsList] = useState([]);
  const user = localStorage.getItem('id');

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

          if (user) {
            // Filter items based on the condition
            const filteredItems = data.items?.filter(el => el.user !== user) || [];
            // Update the state with the filtered items
            setItemsList(filteredItems);
          } else {
            // If there is no user, set itemsList directly
            setItemsList(data.items || []); // Ensure data.items exists or default to an empty array
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
  }, [user]); // Include 'user' in the dependency array to re-run the effect when 'user' changes

  return (
    <div>
      {/* Display itemsList in your component as needed */}
      {itemsList.length > 0 ? (
        itemsList.map((item) => (
          <div key={item._id}>
            {/* Display item details here */}
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{item.price}</p>
          </div>
        ))
      ) : (
        <p>No items to display.</p>
      )}
    </div>
  );
};

export default YourComponent;
