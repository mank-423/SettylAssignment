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

            // Perform the API call to add the item
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
                // Item added successfully
                console.log('Item added successfully!');
                alert("Item added successfully!")
                // You can also redirect or perform any other action here
            } else {
                // Handle error
                console.error('Error adding item:', response.statusText);
            }
        } catch (error) {
            console.error('API call error:', error.message);
        }
    };

    useEffect(() => {
        const fetchUserItems = async () => {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("id");

            try {
                // Perform the API call to get user items
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

        fetchUserItems();
    }, [userItems]); // Run this effect only once when the component mounts


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
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default AddItem;
