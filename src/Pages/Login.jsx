import React, { useState } from 'react'

function Login() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loginSuccess, setLoginSuccess] = useState(false);

  // Fetch API usage
  async function LoginUser(event) {
    event.preventDefault();

    const response =
      await fetch("http://localhost:5000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // name, 
          email,
          password
        })
      })

    const data = await response.json();
    console.log(data);

    if (data.user) {
      alert("Login Successful");
      // saving the token for the user to localstorage
      localStorage.setItem('token', data.user);
      localStorage.setItem('id', userName);

      console.log(data.user);
      // window.location.href="/"; //to go to home again
      window.location.href = "/quote";

    } else {
      alert("Please check your username and password");
    }


  }

  // If loginSuccess is true, redirect to the '/' route
  // if (loginSuccess) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={LoginUser}>
        {/* Name of the user */}
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
        <input type="submit" value="Login" />
      </form>


    </div>
  )
}

export default Login
