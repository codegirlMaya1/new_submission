import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let username = credentials.username;
    const existingUsers = JSON.parse(localStorage.getItem('customers')) || [];
    let userExists = existingUsers.some(user => user.username === username);
    let counter = 1;

    while (userExists) {
      username = `${credentials.username}${counter}`;
      userExists = existingUsers.some(user => user.username === username);
      counter++;
    }

    const user = { ...credentials, username, name: username, email: '', phone: '', address: '', profilePicture: '' };
    existingUsers.push(user);
    localStorage.setItem('customers', JSON.stringify(existingUsers));
    localStorage.setItem('user', JSON.stringify(user));
    setLoggedIn(true);
    navigate('/products'); // Redirect to products page after login
  };

  return (
    <div>
      <h2>Login</h2>
      {loggedIn ? (
        <p>Login successfully! Return to Home</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" value={credentials.username} onChange={handleChange} placeholder="Username" required />
          <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      )}
      <button onClick={() => navigate('/')}>Continue as Guest</button>
    </div>
  );
};

export default Login;