import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductForm from './ProductForm';
import { CartProvider } from './CartContext';

const renderWithCartProvider = (ui) => {
  return render(
    <CartProvider>
      {ui}
    </CartProvider>
  );
};

test('submits the form with product data', () => {
  const handleSubmit = jest.fn();
  renderWithCartProvider(<ProductForm onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByLabelText(/product name/i), { target: { value: 'Test Product' } });
  fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '100' } });
  fireEvent.change(screen.getByLabelText(/image url/i), { target: { value: 'https://via.placeholder.com/50' } });

  fireEvent.click(screen.getByText(/add product/i));

  expect(handleSubmit).toHaveBeenCalledWith(expect.objectContaining({
    name: 'Test Product',
    price: '100',
    image: 'https://via.placeholder.com/50',
  }));
});