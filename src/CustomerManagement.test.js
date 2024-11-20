import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerManagement from './CustomerManagement.jsx';

const mockCustomers = [
  { id: 1, name: 'Customer 1', email: 'customer1@example.com', phone: '1234567890' },
  { id: 2, name: 'Customer 2', email: 'customer2@example.com', phone: '0987654321' },
];

beforeEach(() => {
  localStorage.setItem('customers', JSON.stringify(mockCustomers));
  localStorage.setItem('user', JSON.stringify({ id: 1, name: 'User 1' }));
});

test('renders customer list', () => {
  render(<CustomerManagement />);

  expect(screen.getByText(/customer 1/i)).toBeInTheDocument();
  expect(screen.getByText(/customer 2/i)).toBeInTheDocument();
});

test('adds a new customer', () => {
  render(<CustomerManagement />);

  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Customer 3' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'customer3@example.com' } });
  fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1122334455' } });
  fireEvent.click(screen.getByText(/add customer/i));

  expect(screen.getByText(/customer 3/i)).toBeInTheDocument();
  expect(screen.getByText(/customer3@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/1122334455/i)).toBeInTheDocument();
});

test('deletes a customer', () => {
  render(<CustomerManagement />);

  fireEvent.click(screen.getAllByText(/delete/i)[0]);

  expect(screen.queryByText(/customer 1/i)).not.toBeInTheDocument();
});