import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; // We'll create this CSS file for styling

const Sidebar = () => (
  <div className="sidebar">
    <nav className="nav flex-column">
      
      <Link className="nav-link" to="/customer">Customer</Link>
      <Link className="nav-link" to="/all-customers">All Customers</Link>
    
    </nav>
  </div>
);

export default Sidebar;