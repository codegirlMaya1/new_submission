import React, { useState, useEffect } from 'react';

const sampleOrders = [
  { id: 1, product: 'Sample Product 1', quantity: 2, price: 20, image: 'https://via.placeholder.com/50', customerId: 1 },
  { id: 2, product: 'Sample Product 2', quantity: 1, price: 20, image: 'https://via.placeholder.com/50', customerId: 1 },
];

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setLoggedInUser(user);

    const allOrders = JSON.parse(localStorage.getItem('orders')) || sampleOrders;
    setOrders(allOrders);
  }, []);

  const getUserOrders = () => {
    if (!loggedInUser) return [];
    return orders.filter(order => order.customerId === loggedInUser.id);
  };

  return (
    <div>
      <h2>Past Orders</h2>
      {orders.length === 0 ? (
        <p>No past orders</p>
      ) : (
        <div>
          <h3>All Orders</h3>
          <ul>
            {orders.map(order => (
              <li key={order.id}>
                <img src={order.image} alt={order.product} style={{ width: '50px', height: '50px' }} />
                {order.product} - Quantity: {order.quantity} - Total: ${order.price * order.quantity}
              </li>
            ))}
          </ul>
          {loggedInUser && (
            <>
              <h3>{loggedInUser.name}'s Orders</h3>
              <ul>
                {getUserOrders().map(order => (
                  <li key={order.id}>
                    <img src={order.image} alt={order.product} style={{ width: '50px', height: '50px' }} />
                    {order.product} - Quantity: {order.quantity} - Total: ${order.price * order.quantity}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;