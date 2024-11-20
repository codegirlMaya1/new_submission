import React from 'react';
import { useCart } from './CartContext';

const Inventory = ({ products, onDelete }) => {
  const { dispatch } = useCart();

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} />
            {product.name} - ${product.price}
            <button onClick={() => addToCart(product)} style={{ marginLeft: '10px', padding: '5px 10px' }}>Add to Cart</button>
            <button onClick={() => onDelete(product.id)} style={{ marginLeft: '10px', padding: '5px 10px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;