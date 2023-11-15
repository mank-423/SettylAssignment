import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Fetch API usage
    async function registerUser(event) {
        event.preventDefault();

        const response =
            await fetch("http://localhost:5000/api/register", {
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
            })

        const data = await response.json();
        console.log(data);

        if (data.status === 'ok'){
            navigate('/login')
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                {/* Name of the user */}
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                />

                {/* Username */}
                {/* Name of the user */}
                <br />
                <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    placeholder="Username"
                />

                {/* Email */}
                <br />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                />

                {/* Password */}
                <br />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder='Password'
                />
                {/* Btn */}
                <br />
                <input type="submit" value="Register" />
            </form>


        </div>
    )
}

export default Register
