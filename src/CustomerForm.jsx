import React, { useState } from 'react';

const CustomerForm = ({ onSubmit }) => {
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(customer);
    setCustomer({ name: '', email: '', phone: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" value={customer.name} onChange={handleChange} />

      <label htmlFor="email">Email</label>
      <input id="email" name="email" value={customer.email} onChange={handleChange} />

      <label htmlFor="phone">Phone</label>
      <input id="phone" name="phone" value={customer.phone} onChange={handleChange} />

      <button type="submit">Add Customer</button>
    </form>
  );
};

export default CustomerForm;