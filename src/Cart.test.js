import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Cart from './Cart';

const renderWithProviders = (ui, { ...renderOptions } = {}) => {
  return render(
    <Router>
      <CartProvider>
        {ui}
      </CartProvider>
    </Router>,
    renderOptions
  );
};

test('adds item to cart', () => {
  const { getByText } = renderWithProviders(<Cart />);
  // Add your test logic here
});