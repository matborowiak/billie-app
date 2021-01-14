import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders the logo', () => {
  render(<App />)
  const logo = screen.getByText(/Billie.io/i)
  expect(logo).toBeInTheDocument()
})
