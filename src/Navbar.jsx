import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">ORDERS</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/cart">{language === 'en' ? 'Cart' : 'Carrito'}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/customer">{language === 'en' ? 'User Account' : 'Cuenta de Usuario'}</Link>
          </li>
          <li className="nav-item">
            {user ? (
              <span className="nav-link">Hello, {user.name}</span>
            ) : (
              <Link className="nav-link" to="/login">{language === 'en' ? 'Login' : 'Iniciar Sesión'}</Link>
            )}
          </li>
        </ul>
        <select value={language} onChange={handleLanguageChange} className="form-control">
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
        <button onClick={handleLogout} className="btn btn-outline-danger ml-2">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;