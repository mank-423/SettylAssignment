# Settyl Assignment API

A MERN project built as real-time bidding application. This assignment is a full-stack project.

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Set up the Frontend](#set-up-the-frontend)
  - [Running the Server](#running-the-server)
- [UI of project](#ui-of-project)
- [API Endpoints](#api-endpoints)
- [API Calls](#api-call)

## Introduction
A real-time online marketplace where users can list items for sale, buy items from other users, and engage in real-time auctions for unique items.

## Technologies

List the main technologies or libraries used in your project.

- Node.js
- Express.js
- MongoDB
- WebSocket
- Mongoose
- Bcrypt.js
- JWT
- React.js
- Tailwind CSS
- react-router-dom

## Getting Started

The features of the project:
1. User can search for the products.
2. Register and Login of users
3. Users can place bids on items, see current bid amounts, and receive updates in real-time.
4. A transaction management system for completing purchases
5. Websocket for communication in real-time auctions
6. User authentication with JWT
7. Storing user data, item listing, auction data, and transaction history

### Installation

Clone the repository:

   ```bash
    https://github.com/mank-423/SettylAssignment
   ```

### Set up the Frontend
```bash
cd SettylAssignment
npm install
npm start
```

### Runing the server

```bash
cd SettylAssignment/server
npm install
node index.js
```

## UI of project

- Home page
<img width="947" alt="image" src="https://github.com/mank-423/SettylAssignment/assets/96490105/5ba42894-6881-4bf7-bb8e-2da910fc78f7">

- Register page
<img width="949" alt="image" src="https://github.com/mank-423/SettylAssignment/assets/96490105/efe2f625-bb97-4a5b-a381-873c157effd2">

- Login page
<img width="946" alt="image" src="https://github.com/mank-423/SettylAssignment/assets/96490105/f5ff0fd9-ba43-4356-a3ca-3229c375c40d">

- After log-in, navigate it to the profile section, routed with '/addItem'
<img width="947" alt="image" src="https://github.com/mank-423/SettylAssignment/assets/96490105/d27ed31d-b5c2-453a-9e2f-88a5bc5eaf59">

- Add item to go for bidding also with transaction area, when the user will close the bidding it will add up to the transactions
<img width="960" alt="image" src="https://github.com/mank-423/SettylAssignment/assets/96490105/b5d2c4d9-7906-469d-8967-c68a7d68d5c5">
<img width="960" alt="image" src="https://github.com/mank-423/SettylAssignment/assets/96490105/af17552e-624e-4f55-a3be-d7806d92ca25">

- On home page, after logging in accesssing the bidding and chat feature
<img width="951" alt="image" src="https://github.com/mank-423/SettylAssignment/assets/96490105/5077a52f-b1ab-49d9-8c4c-58c22e6f81ed">
<img width="950" alt="image" src="https://github.com/mank-423/SettylAssignment/assets/96490105/80c05804-47e9-4761-92ce-3b64dff1b02b">

- Sending chats
<img width="949" alt="image" src="https://github.com/mank-423/SettylAssignment/assets/96490105/d4e34d2f-ebc8-4759-b17a-d4994e2806af">

  


## API Endpoints
- POST /api/register : Register a new user.
- POST /api/login : Log in an existing user.
- POST /api/items : Add a new item.
- GET /api/items/:id : Get items associated with a specific user.
- PUT /api/items/:id/close-bidding : Close bidding for a specific item.
- POST /api/items/:itemId/bid : Place a bid on a specific item.
- GET /api/transactions/:username : Get transactions for a specific user.
- GET /api/items : Get all items.


## Authentication
Using JWT token, for login purpose and the user is stored in localStorage. And the token is fetched to use for login purpose. I have used my own made loginComponentJWT which is available on my Github

## API call
- Only API which is accessible without token and username
<img width="960" alt="image" src="https://github.com/mank-423/settylapi/assets/96490105/0dda477b-e86c-458d-891a-7b91de3056ff">

- Other API endpoints need the JWT token, and username for the item.
