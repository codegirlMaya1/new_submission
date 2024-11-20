import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import ProductForm from './ProductForm';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { dispatch } = useCart();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const addProduct = (product) => {
    setProducts([product, ...products]);
  };

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div>
      <h1>Products</h1>
      <ProductForm onSubmit={addProduct} />
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title || product.name} style={{ width: '50px', height: '50px' }} />
            {product.title || product.name} - ${product.price}
            <button onClick={() => addToCart(product)} style={{ marginLeft: '10px', padding: '5px 10px' }}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;