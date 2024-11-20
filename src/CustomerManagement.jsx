import React, { useState, useEffect } from 'react';
import CustomerForm from './CustomerForm';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    setCustomers(storedCustomers);

    const user = JSON.parse(localStorage.getItem('user'));
    setLoggedInUser(user);
  }, []);

  const addCustomer = (customer) => {
    const newCustomers = [...customers, { ...customer, id: Date.now() }];
    setCustomers(newCustomers);
    localStorage.setItem('customers', JSON.stringify(newCustomers));
  };

  const deleteCustomer = (id) => {
    const updatedCustomers = customers.filter(customer => customer.id !== id);
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
  };

  const getCustomerOrders = (customerId) => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    return orders.filter(order => order.customerId === customerId);
  };

  return (
    <div>
      <h1>Manage Customers</h1>
      {loggedInUser && (
        <div>
          <h2>{loggedInUser.name}'s Orders</h2>
          {getCustomerOrders(loggedInUser.id).map(order => (
            <div key={order.id}>
              <h3>Order #{order.id}</h3>
              <ul>
                {order.items.map(item => (
                  <li key={item.name}>{item.name} - ${item.price}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <CustomerForm onSubmit={addCustomer} />
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            {customer.name} - {customer.email} - {customer.phone}
            <button onClick={() => deleteCustomer(customer.id)}>Delete</button>
            <div>
              <h4>Past Orders:</h4>
              {getCustomerOrders(customer.id).map(order => (
                <div key={order.id}>
                  <h5>Order #{order.id}</h5>
                  <ul>
                    {order.items.map(item => (
                      <li key={item.name}>{item.name} - ${item.price}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerManagement;