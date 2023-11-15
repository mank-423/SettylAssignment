import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("token"); // Check if the user is logged in

  const handleLogout = () => {
    // Implement logout logic, clear localStorage, or perform any other necessary actions
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    // Redirect to the home page or perform other actions
    window.location.href = "/";
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center font-bold">
        <Link to="/" className="text-white text-xl font-bold">
          e-Auction
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white">
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/addItem" className="text-white">
                Profile
              </Link>
              <button onClick={handleLogout} className="text-white cursor-pointer">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white">
                Login
              </Link>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
