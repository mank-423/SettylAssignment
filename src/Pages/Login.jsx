import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("https://settylapi.onrender.com/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    if (data.user) {
      alert("Login Successful");
      localStorage.setItem('token', data.user);
      localStorage.setItem('id', userName);
      navigate('/addItem');
    } else {
      alert("Please check your username and password");

      // Check if the user is not registered, then navigate to the register page
      if (data.error === 'User not registered') {
        navigate('/register');
      }
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <div className="bg-black shadow-md p-8 rounded-md w-96">
        <h1 className="text-2xl font-bold mb-4 flex justify-center text-white">Login</h1>
        <div className="mb-4">
          <Link to="/register" className="text-blue-500 hover:underline">
            Don't have an account? Register here.
          </Link>
        </div>
        <form onSubmit={loginUser}>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder='Password'
            />
          </div>
          <div className="mb-4">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
