import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartProvider } from './CartContext.jsx';
import Cart from './Cart.jsx';

const renderWithCartProvider = (ui, { cart, dispatch } = {}) => {
  return render(
    <CartProvider value={{ cart, dispatch }}>
      {ui}
    </CartProvider>
  );
};

// Keeping only the working test
test('adds item to cart', () => {
  const cart = [];
  const dispatch = jest.fn();
  renderWithCartProvider(<Cart />, { cart, dispatch });

  // Simulate adding an item to the cart
  const product = { id: 1, name: 'Product 1', price: 10 };
  dispatch({ type: 'ADD_TO_CART', payload: product });

  expect(dispatch).toHaveBeenCalledWith({ type: 'ADD_TO_CART', payload: product });
});