import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  const view = render(<App />);
  expect(view).not.toBeNull()
});
