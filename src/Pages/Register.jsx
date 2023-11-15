import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/api/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        userName,
        email,
        password
      })
    });

    const data = await response.json();

    if (data.status === 'ok') {
      navigate('/login');
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <div className="bg-black shadow-md p-8 rounded-md w-96 text-white">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">Register</h1>
        <button
          className="mb-4 text-blue-500 hover:underline"
          onClick={() => navigate('/login')}
        >
          Already have an account? Login
        </button>
        
        <form onSubmit={registerUser}>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
          </div>
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
