// pages/index.js

import React, { useState } from 'react';
import Login from '../pages/Login';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (loggedInUsername) => {
    setIsLoggedIn(true);
    setUsername(loggedInUsername);
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Halo, {username}!</h1>
          {/* Konten halaman utama setelah login */}
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Home;
