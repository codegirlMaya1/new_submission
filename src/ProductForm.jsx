import React, { useState } from 'react';
import { useCart } from './CartContext';

const ProductForm = ({ onSubmit }) => {
  const [product, setProduct] = useState({ id: '', name: '', price: '', image: '' });
  const { dispatch } = useCart();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { ...product, id: Date.now() };
    onSubmit(newProduct);
    dispatch({ type: 'ADD_TO_CART', payload: newProduct });
    setProduct({ id: '', name: '', price: '', image: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={product.image}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;