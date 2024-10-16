import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Navbar({ scrollToSection, username, setUsername }) {
  const [CheckLocalUser, setCheckLocalUser] = useState(username);

  // Handle logout and clear local storage
  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:3001/auth/logout");
      if (res.status === 200) {
        alert("Logout successful");
        // Clear the local storage and reset the state
        localStorage.removeItem("username");
        setCheckLocalUser(null);
        setUsername(null); // Update the username in Home as well
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setCheckLocalUser(storedUser);
    }
  }, [username]);

  return (
    <div className='lg:bg-gray-800 bg-gray-200 font-semibold lg:text-white lg:p-6 py-3 shadow-xl'>
      <div className='flex justify-around items-center'>
        <div>
          <h1 className='lg:text-2xl text-xl'>
            <span className='text-red-500 font-bold text-2xl lg:text-3xl'>D</span>eo
            <span className='text-red-500 font-bold text-2xl lg:text-3xl'>V</span>ansh
            <span className='text-yellow-500 font-bold text-2xl lg:text-3xl'> P</span>alace &
            <span className='text-yellow-500 font-bold text-2xl lg:text-3xl hover:text-red-500'> R</span>estaurant
          </h1>
        </div>
        <div className='hidden lg:block'>
          <div className='flex justify-around gap-6 items-center'>
            <button onClick={() => scrollToSection('home')} className='text-sm hover:text-red-500 transition duration-300 font-semibold uppercase hover:underline'>Home</button>
            <button onClick={() => scrollToSection('gallery')} className='text-sm hover:text-yellow-500 transition duration-300 font-semibold uppercase hover:underline'>Restaurant</button>
            <button onClick={() => scrollToSection('gallery')} className='text-sm hover:text-yellow-500 transition duration-300 font-semibold uppercase hover:underline'>Gallery</button>
            <button onClick={() => scrollToSection('services')} className='text-sm hover:text-indigo-500 transition duration-300 font-semibold uppercase hover:underline'>Services</button>
            <button onClick={() => scrollToSection('contact')} className='text-sm hover:text-blue-500 transition duration-300 font-semibold uppercase hover:underline'>Contact</button>
            <button onClick={() => scrollToSection('about')} className='text-sm hover:text-red-500 transition duration-300 font-semibold uppercase hover:underline'>About</button>

            {/* Conditionally render the logout button if the user is logged in */}
            {CheckLocalUser ? (
              <button onClick={handleLogout} className='text-sm hover:text-red-500 transition duration-300 font-semibold uppercase hover:underline'>Logout</button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
