import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders homepage modal', () => {
  render(<App />);
  const linkElement = screen.getByText(/Kory Jackson/);
  expect(linkElement).toBeInTheDocument();
});
