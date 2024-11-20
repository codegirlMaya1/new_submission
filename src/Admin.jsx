import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import Inventory from './Inventory';
import OrderManagement from './OrderManagement';

const Admin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const addProduct = (product) => {
    const updatedProducts = [product, ...products];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <ProductForm onSubmit={addProduct} />
      <Inventory products={products} onDelete={deleteProduct} />
      <OrderManagement />
    </div>
  );
};

export default Admin;